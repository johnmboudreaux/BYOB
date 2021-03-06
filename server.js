const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');

require('dotenv').config();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const checkAuth = (request, response, next) => {
  let token = request.body.token ||
              request.param('token') ||
              request.headers['authorization'];

  if (!token) {
    return response.status(403).json({ error: `Authorization is required ${error}` });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return response.status(403).json({ error: `Invalid token ${ error }` });
    }
    if (decoded) {
      decoded.admin ? next()
        :
        response.status(403).json({ error: `Authorization is required ${error}` });
    }
  });
};

app.post('/api/v1/authenticate', (request, response) => {
  const { email, appName } = request.body;
  const emailSuffix = email.split('@')[1];

  if (!email || !appName) {
    return response.status(422).json({ error: `Missing email or application name ${error}` });
  }

  let adminCheck = emailSuffix === 'turing.io' ?
    Object.assign({}, { email, appName, admin: true })
    :
    Object.assign({}, { email, appName, admin: false });

  const token = jwt.sign(adminCheck, process.env.SECRET_KEY);
  return response.status(201).json({ token });
});

app.get('/api/v1/owners', (request, response) => {
  database('home_owner').select()
    .then(owners => response.status(200).json(owners))
    .catch(error => response.status(500).json({error: `internal server error ${error}`}));
});

app.get('/api/v1/owners/:id', (request, response) => {
  const id = request.params.id;

  database('home_owner').where('id', id).select()
    .then(owner => {
      owner.length ? response.status(200).json(owner)
        :
        response.status(404).json({
          error: `Could not find owner with id: ${id}`
        });
    })
    .catch(error => response.status(500).json({error})
    );
});

app.get('/api/v1/homes', (request, response) => {
  const queryParam = Object.keys(request.query)[0];
  const queryParamValue = request.query[queryParam];

  !queryParam ? database('homes').select()
    .then(homes => response.status(200).json(homes))
    .catch(error => response.status(500).json({ error: `internal server error ${error}`}))
    :
    database('homes').where(queryParam, queryParamValue).select()
      .then(homes => homes.length ?
        response.status(200).json(homes)
        :
        response.status(404).json({error: `No home with ${queryParam} found`})
      )
      .catch(error => response.status(500).json({error: `Internal server error ${error}`}));
});

app.get('/api/v1/owners/:id/homes', (request, response) => {
  const ownerId = request.params.id;

  database('homes').where('ownerId', ownerId).select()
    .then(home => home.length ?
      response.status(200).json(home)
      :
      response.status(404).json({
        error: `Could not find home with id: ${ownerId}`
      }))
    .catch(error => esponse.status(500).json({error: `Internal server error ${error}`}));
});


app.post('/api/v1/owners', checkAuth, (request, response) => {
  const newOwner = request.body;
  delete newOwner.token;

  for (let requiredParameter of ['firstName', 'lastName', 'streetAddress', 'zipCode']) {
    if (!newOwner[requiredParameter]) {
      return response.status(422).json({
        error: `you are missing the ${requiredParameter} property`
      });
    }
  }

  database('home_owner').insert(newOwner, '*')
    .then(insertedOwner => response.status(201).json(insertedOwner))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/owners/:id/homes', checkAuth, (request, response) => {
  let home = request.body;
  const { id } = request.params;
  delete home.token;

  for ( let requiredParameter of ['houseName', 'houseAddress', 'description', 'bathrooms', 'bedrooms', 'zipCode', 'ownerId']) {
    if (!home[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property`
      });
    }
  }
  home = Object.assign({}, home, { ownerId: id });

  database('homes').insert(home, '*')
    .then(insertedHome => response.status(201).json(insertedHome))
    .catch(error => response.status(500).json({ error: `Internal Server Error ${error}`}));
});

app.put('/api/v1/owners/:id', checkAuth, (request, response) => {
  let updatedOwner = request.body;
  const { id } = request.params;
  delete updatedOwner.token;

  for ( let requiredParameter of ['firstName', 'lastName', 'streetAddress', 'zipCode']) {
    if (!updatedOwner[requiredParameter]){
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property`
      });
    }
  }
  updatedOwner = Object.assign({}, updatedOwner, {id: id});

  database('home_owner').where('id', id).update(updatedOwner, '*')
    .then(updatedOwner => !updatedOwner.length ?
      response.status(422).json({error: `Owner ID does not exist`})
      :
      response.status(201).json(updatedOwner)
    )
    .catch(error => response.status(500).json({error: `Internal server error ${error}`}));
});

app.put('/api/v1/homes/:id', checkAuth, (request, response) => {
  let updatedHome = request.body;
  const { id } = request.params;
  delete updatedHome.token;

  for ( let requiredParameter of ['houseName', 'houseAddress', 'description', 'bathrooms', 'bedrooms', 'zipCode', 'ownerId']) {
    if (!updatedHome[requiredParameter]){
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property`
      });
    }
  }

  updatedHome = Object.assign({}, updatedHome, {id: id});

  database('homes').where('id', id).update(updatedHome, '*')
    .then(updatedHome => !updatedHome.length ?
      response.status(422).json({error: `Home ID does not exist`})
      :
      response.status(201).json(updatedHome)
    )
    .catch(error => response.status(500).json({error: `Internal server error ${error}`}));
});

app.delete('/api/v1/owners/:id', checkAuth, (request, response) => {
  const { id } = request.params;
  delete request.body.token;

  database('homes').where('ownerId', id).del()
    .catch(error => response.status(500).json({error: `Internal server error ${error}`}));

  database('home_owner').where('id', id).del()
    .then(owner =>  owner ?
      response.sendStatus(204)
      :
      response.status(422).json({ error: `Nothing to delete with id ${id}`})
    )
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/homes/:id', checkAuth, (request, response) => {
  const { id } = request.params;
  delete request.body.token;

  database('homes').where('ownerId', id).del()
    .then(home => home ?
      response.sendStatus(204)
      :
      response.status(422).json({ error: `Nothing to delete with id ${id}`})
    )
    .catch(error => response.status(500).json({ error }));

});

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}.`);
});

module.exports = app;
