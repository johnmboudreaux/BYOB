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
    return response.status(403).json({ error: `Authorization is required ${error}` });
  }

  jwt.verify(token, app.get('secretKey'), (error, decoded) => {
    if(error) {
      return response.status(403).json({ error: `Invalid token ${ error }` });
    }
    if(decoded) {
      decoded.admin ? next()
        :
        response.status(403).json({ error: `Authorization is required ${error}` });
    }
  });
};

app.post('/api/v1/authenticate', (request, response) => {
  const { email, appName } = request.body;
  const emailSuffix = email.split('@')[1];

  if(!email || !appName) {
    return response.status(422).json({ error: `Missing email or application name ${error}` });
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

app.get('/api/v1/owners/:id/homes', (request, response) => {
  const ownerId = request.params.id;

  database('homes').where('ownerId', ownerId).select()
  .then(home => {
    if(home.length){
      return response.status(200).json(home)
    } else {
      return response.status(404).json({
        error: `Could not find home with id: ${id}`
      })
    }
  })
  .catch(error => {
    return response.status(500).json({error: `Internal server error`})
  })
});


app.post('/api/v1/owners', (request, response) => {
  const newOwner = request.body;

  for (let requiredParameter of ['firstName', 'lastName', 'streetAddress', 'zipCode']) {
    if(!newOwner[requiredParameter]) {
      return response.status(422).json({
        error: `you are missing the ${requiredParameter} property`
      })
    }
  }
  database('home_owner').insert(newOwner, '*')
  .then(insertedOwner => {
    return response.status(201).json(insertedOwner)
  })
  .catch(error => {
    return response.status(500).json({ error })
  })
});

app.post('/api/v1/owners/:id/homes', (request, response) => {
  let home = request.body;
  const { id } = request.params;

  for ( let requiredParameter of ['houseName', 'houseAddress', 'description', 'bathrooms', 'bedrooms', 'zipCode', 'ownerId']) {
    if (!home[requiredParameter]) {
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property`
      });
    }
  }
  home = Object.assign({}, home, { ownerId: id });

  database('homes').insert(home, '*')
    .then(insertedHome => {
      return response.status(201).json(insertedHome);
    })
    .catch(error => {
      return response.status(500).json({ error: `Internal Server Error ${error}`});
    });
});

app.put('/api/v1/owners/:id', (request, response) => {
  let updatedOwner = request.body
  const { id } = request.params


  for( let requiredParameter of ['firstName', 'lastName', 'streetAddress', 'zipCode']) {
    if(!updatedOwner[requiredParameter]){
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property`
      });
    }
  }
  updatedOwner = Object.assign({}, updatedOwner, {id: id});

  database('home_owner').where('id', id).update(updatedOwner, '*')
  .then(updatedOwner => {
    if(!updatedOwner.length){
      return response.status(422).json({error: `Owner ID does not exist ${error}`})
    }
    return response.status(200).json(updatedOwner)
  })
  .catch(error => {
    return response.status(500).json({error: `Is this you who dis`})
  })
})

app.put('/api/v1/homes/:id', (request, response) => {
  let updatedHome = request.body
  const { id } = request.params

  for( let requiredParameter of ['houseName', 'houseAddress', 'description', 'bathrooms', 'bedrooms', 'zipCode', 'ownerId']) {
    if(!updatedHome[requiredParameter]){
      return response.status(422).json({
        error: `You are missing the ${requiredParameter} property`
      });
    }
  }

  updatedHome = Object.assign({}, updatedHome, {id: id});

  database('homes').where('id', id).update(updatedHome, '*')
  .then(updatedHome => {
    if(!updatedHome.length){
      return response.status(422).json({error: `Owner ID does not exist ${error}`})
    }
    return response.status(200).json(updatedHome)
  })
  .catch(error => {
    return response.status(500).json({error: `Is this you who dis`})
  })
});

app.delete('/api/v1/owners/:id', (request, response) => {
  const { id } = request.params;

  database('homes').where('ownerId', id).del()
  .then(home => {
    return response.status(204)
 })
  .catch(error => {
      response.status(500).json({ error })
    })

 database('home_owner').where('id', id).del()
  .then(length => {
    length ? response.sendStatus(204) : response.status(422)
  .send({ error: `Nothing to delete with id ${id}`})
 })
  .catch(error => {
      response.status(500).json({ error })
    })
});

app.delete('/api/v1/homes/:id', (request, response) => {
  const { id } = request.params;

  database('homes').where('ownerId', id).del()
  .then(length => {
    length ? response.sendStatus(204) : response.status(422)
    .send({ error: `Nothing to delete with id ${id}`})
  })
  .catch(error => {
    response.status(500).json({ error })
  })

});

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}.`);
});

module.exports = app;
