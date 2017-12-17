# Build Your Own Backend

### by Ben Porter and John Boudreaux

> This application is an express backend with a postgresql database. The data is imported into a json file
which is then used to seed two relational data tables. It also supports json web tokens, which requires the
client to request a token with a valid email address and application name before they are allowed to modify
any data saved to the one of the two data tables provided by our schema.

> BYOB runs with `webpack` and `express` so to get started first you must clone this repo and the navigate into the cloned directory.
Once in the directory open a separate terminal tab and in one run `npm run build` and the other `npm start`.
Navigate to localhost:3000 in your browser and input fields will appear.


## Constructed With

```
* HTML
* CSS
* JavaScript
* Knex
* Express
* Mocha/Chai
* PostgreSQL
* JWT Tokens
```

## API Documentation

### `Authentication`

> This endpoint provides a JWT which is where access is granted to a user to manipulate data. It checks for a valid email and an
application name in order to return a token.

`/api/v1/authenticate`

> In order to receive a token the body of the request must contain the **appName** and **email** properties.

> Below is an example of a request and a response

> **request:**
```
{
    "email": "example@turing.io",
    "appName": "palette-picker"
}
```

> **response:**
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lQG1lLmNvbSIsImFwcE5hbWUiOiJhbHNrZCIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTEzMzc1NjEzfQ.2_aaS4-uS_GLck0R13vP_XUgKjn864y7ap1qf7OVjl4",
    "adminVerification": true
}
```

> The token referenced above must be included when making requests against the following endpoint methods:

```
    POST
    PUT
    DELETE
    PATCH
```

> without it the user will not be able to successfully make any of these calls.

> The following endpoints require this authentication:

```
  /api/v1/owners --
  /api/v1/owners/:id/homes
  /api/v1/owners/:id
  /api/v1/homes/:id'
  /api/v1/owners/:id
  /api/v1/homes/:id
```

> There are three methods by which a token can be included:

- **Authorization Header:** Add an 'Authorization' header to the request with the token as the value.

- **Query Parameter:** Include a '?token=' the request path with the token as value.

- **Request Body:** it can also be included in the body of the request as a property with a key of token and a value of the actual token.


#### _HTTP Response Codes_
When a request is made a response will be returned with one of the following status codes:

* `200` `OK` The request was successful
* `403` `Forbidden` You do not have permission to view the requested file or resource
* `404` `Not found` The request was successful, but the server could not find what was requested
* `500` `Server Error` An error occurred within the server

> Below are the available endpoints included in the server

### Authenticate

- **[<code>POST</code> /api/v1/authenticate](docs/POST_authenticate.md)**

### Homes

- **[<code>GET</code> /api/v1/homes](docs/GET_homes.md)**
- **[<code>GET</code> /api/v1/owners/:id/homes](docs/GET_home_by_owner_id.md)**
- **[<code>POST</code> /api/v1/owners/:id/homes](docs/POST_home_to_owner.md)**
- **[<code>DELETE</code> /api/v1/homes/:id](docs/DELETE_home.md)**
- **[<code>PUT</code> /api/v1/homes/:id](docs/PUT_home_by_id.md)**

### Owners

- **[<code>GET</code> /api/v1/owners](docs/GET_owners.md)**
- **[<code>GET</code> /api/v1/owners/:id](docs/GET_owners_by_id.md)**
- **[<code>POST</code> /api/v1/owners](docs/POST_owners.md)**
- **[<code>PUT</code> /api/v1/owners/:id](docs/PUT_owners_id.md)**
- **[<code>DELETE</code> /api/v1/owners/:id](docs/DELETE_owner.md)**
