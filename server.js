/*eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');

require('dotenv').config();

app.set('secretKey', process.env.SECRET_KEY);
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));



const checkAuth = (request, response, next) => {
  let token;

  if(request.headers.authorization) {
    token = request.headers.authorization;
  }

  if(request.body.token) {
    token = request.body.token;
  }

  if(request.query.token) {
    token = request.query.token;
  }

  if(!token) {
    return response.status(403).json({ error: 'You must be authorized to hit this endpoint' });
  }

  jwt.verify(token, app.get('secretKey'), (error, decoded) => {
    if(error) {
      return response.status(403).json({ error: 'Invalid token' });
    }
    if(decoded) {
      decoded.admin ? next()
        :
        response.status(403).json({ error: 'You are not authorized to have write access to this endpoint' });
    }
  });
};

app.post('/api/v1/authenticate', (request, response) => {
  const { email, appName } = request.body;
  const emailSuffix = email.split('@')[1];

  if(!email || !appName) {
    return response.status(422).json({ error: 'You are missing an email or application name' });
  }

  let adminCheck = emailSuffix === 'turing.io' ?
    Object.assign({}, { email, appName, admin: true })
    :
    Object.assign({}, { email, appName, admin: false });

  const token = jwt.sign(adminCheck, app.get('secretKey'));
  return response.status(200).json({ token });

});

app.get('/', (request, response) => {
  response.send('Welcome to BYOB!');
});

app.get('/api/v1/owners', (request, response) => {
  database('home_owner').select()
  .then(owners => {
    return response.status(200).json(owners)
  })
  .catch(error => {
    return response.status(500).json({
      error: `internal server error ${error}`
    });
  })
});

app.get('/api/v1/homes', (request, response) => {
  database('homes').select()
  .then(homes => {
    return response.status(200).json(homes)
  })
  .catch(error => {
    return response.status(500).json({
      error: `internal server error ${error}`
    });
  })
});

app.get('/api/v1/owners/:id', (request, response) => {
  const id = request.params.id;
  database('home_owner').where('id', id).select()
  .then(owner => {
    if(owner.length){
      return response.status(200).json(owner)
    } else {
      return response.status(404).json({
        error: `Could not find owner with id: ${id}`
      })
    }
  })
  .catch(error => {
    return response.status(500).json({error})
  })
});

app.get('', (request, response) => {

});


app.post('', (request, response) => {

});

app.post('', (request, response) => {

});

app.delete('', (request, response) => {

});

app.delete('', (request, response) => {

});

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}.`);
});

module.exports = app;
