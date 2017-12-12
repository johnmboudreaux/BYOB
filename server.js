/*eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const requireHTTPS = (request, response, next) => {
  if (request.header('x-forwarded-proto') != 'https') {
    return response.redirect(`https://${request.header('host')}${request.url}`);
  }
  next();
};

if (process.env.NODE_ENV === 'production') { app.use(requireHTTPS); }

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {

});

app.get('', (request, response) => {

});

app.get('', (request, response) => {

});

app.get('', (request, response) => {

});

app.get('', (request, response) => {

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
