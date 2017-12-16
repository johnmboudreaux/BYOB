/*eslint-disable */
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);


describe('Client Routes', () => {
  it('should return homepage with text', () => {
    return chai.request(server)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.includes('Palette Picker');
      })
      .catch(error => {
        throw error;
      });
  });

  it('should return a 404 if the route does not exsit', () => {
    chai.request(server)
      .get('/sad')
      .then(response => {
        response.should.have.status(404);
      });
  });
});

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  describe('post /api/v1/authenticate', () => {
    it("Create a token for users", (done) => {
      chai.request(server)
        .post('/api/v1/authenticate')
        .send({
	         "email": "someEmail@turing.io",
	         "appName": "appName"
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.should.have.property('token');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET /api/v1/owners', () => {
    it("should return all owners", (done) => {
      chai.request(server)
        .get('/api/v1/owners')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(5);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('firstName');
          response.body[0].should.have.property('lastName');
          response.body[0].should.have.property('streetAddress');
          response.body[0].should.have.property('zipCode');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET /api/v1/owners/:id', () => {
  it('should return a specific owner', (done) => {
    chai.request(server)
      .get('/api/v1/owners/1')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].id.should.equal(1);
        response.body[0].firstName.should.equal('John');
        response.body[0].lastName.should.equal('Boudreaux');
        response.body[0].streetAddress.should.equal('6825 Garrison St.');
        response.body[0].zipCode.should.equal(80004);
        response.body[0].should.have.property('created_at');
        response.body[0].should.have.property('updated_at');
        done();
      })
      .catch((error) => {
        throw error;
      });
    });
  });

  describe('GET /api/v1/owners/:id', () => {
  it('should return 404 error for owner that does not exist', (done) => {
    chai.request(server)
      .get('/api/v1/owners/100')
      .then((response) => {
        response.should.have.status(404);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.equal('Could not find owner with id: 100');
        done();
      })
      .catch((error) => {
        throw error;
      });
    });
  });

  describe('GET /api/v1/homes', () => {
    it("should return all homes", (done) => {
      chai.request(server)
        .get('/api/v1/homes')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(8);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('houseName');
          response.body[0].should.have.property('description');
          response.body[0].should.have.property('houseAddress');
          response.body[0].should.have.property('bathrooms');
          response.body[0].should.have.property('bedrooms');
          response.body[0].should.have.property('zipCode');
          response.body[0].should.have.property('ownerId');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET /api/v1/homes', () => {
    it("should return queried homes", (done) => {
      chai.request(server)
        .get('/api/v1/homes?zipCode=87501')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(5);
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('GET /api/v1/homes', () => {
    it("should return an error if zip not found", (done) => {
      chai.request(server)
        .get('/api/v1/homes?zipCode=99999')
        .then(response => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('No home with zipCode found');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('/api/v1/owners/:id/homes', () => {
  it('should return a homes for specific owner', (done) => {
    chai.request(server)
      .get('/api/v1/owners/1/homes')
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].id.should.equal(1);
        response.body[0].houseName.should.equal('Cloud House');
        response.body[0].description.should.equal('Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.');
        response.body[0].houseAddress.should.equal('2104 Westfall Avenue');
        response.body[0].bathrooms.should.equal(5);
        response.body[0].bedrooms.should.equal(5);
        response.body[0].zipCode.should.equal(80221);
        response.body[0].ownerId.should.equal(1);
        done();
      })
      .catch((error) => {
        throw error;
      });
    });
  });

  describe('/api/v1/owners/:id/homes', () => {
  it('should return a homes for specific owner', (done) => {
    chai.request(server)
      .get('/api/v1/owners/170/homes')
      .then((response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('Could not find home with id: 170');
        done();
      })
      .catch((error) => {
        throw error;
      });
    });
  });

  describe('POST /api/v1/owners', () => {
    it("should add new owner to owners", (done) => {
      chai.request(server)
        .post('/api/v1/owners')
        .send({
          id: 10,
          firstName: 'ben the borifill',
          lastName: 'porter',
          streetAddress: '1234 borifill pl',
          zipCode: 80058,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjkyNzA4fQ.sT916KQPiD_sbT1Bkguu6VMvkwsWHUkAGHD_b7ul9wo'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(10);
          response.body[0].should.have.property('firstName');
          response.body[0].should.have.property('lastName');
          response.body[0].should.have.property('streetAddress');
          response.body[0].should.have.property('zipCode');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST /api/v1/owners', () => {
    it("should serve an error if a property is missing", (done) => {
      chai.request(server)
        .post('/api/v1/owners')
        .send({
          id: 10,
          lastName: 'porter',
          streetAddress: '1234 borifill pl',
          zipCode: 80058,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjkyNzA4fQ.sT916KQPiD_sbT1Bkguu6VMvkwsWHUkAGHD_b7ul9wo'
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('you are missing the firstName property');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST /api/v1/owners', () => {
    it("should seve an error if token is invalid", (done) => {
      chai.request(server)
        .post('/api/v1/owners')
        .send({
          id: 10,
          lastName: 'porter',
          streetAddress: '1234 borifill pl',
          zipCode: 80058,
          token: 'eiJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjkyNzA4fQ.sT916KQPiD_sbT1Bkguu6VMvkwsWHUkAGHD_b7ul9wo'
        })
        .then(response => {
          response.should.have.status(403);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('Invalid token JsonWebTokenError: invalid token');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST /api/v1/owners', () => {
    it("should serve an error if token does not have admin permission", (done) => {
      chai.request(server)
        .post('/api/v1/owners')
        .send({
          id: 10,
          lastName: 'porter',
          streetAddress: '1234 borifill pl',
          zipCode: 80058,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVFbWFpbEBlbWFpbC5jb20iLCJhcHBOYW1lIjoiYXBwTmFtZSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTEzMzAxOTg1fQ.7W_UQVD251kMfB-CvnUiQWWIIzY6hpLZxBn802-vt6'
        })
        .then(response => {
          response.should.have.status(403);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('Invalid token JsonWebTokenError: invalid signature');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST /api/v1/owners/:id/homes', () => {
    it("should add new home to homes table", (done) => {
      chai.request(server)
        .post('/api/v1/owners/1/homes')
        .send({
          id: 10,
          houseName: 'luxury',
          description: 'holy magoly',
          bedrooms: 4,
          bathrooms: 4,
          houseAddress: '1234 down the road lane',
          zipCode: 80004,
          ownerId: 1,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjkyNzA4fQ.sT916KQPiD_sbT1Bkguu6VMvkwsWHUkAGHD_b7ul9wo'
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(10);
          response.body[0].should.have.property('houseName');
          response.body[0].should.have.property('description');
          response.body[0].should.have.property('houseAddress');
          response.body[0].should.have.property('bathrooms');
          response.body[0].should.have.property('bedrooms');
          response.body[0].should.have.property('zipCode');
          response.body[0].should.have.property('ownerId');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST /api/v1/owners/:id/homes', () => {
    it("should serve an error if token is invalid", (done) => {
      chai.request(server)
        .post('/api/v1/owners/1/homes')
        .send({
          id: 10,
          houseName: 'luxury',
          description: 'holy magoly',
          bedrooms: 4,
          bathrooms: 4,
          houseAddress: '1234 down the road lane',
          zipCode: 80004,
          ownerId: 1,
          token: 'eiJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjkyNzA4fQ.sT916KQPiD_sbT1Bkguu6VMvkwsWHUkAGHD_b7ul9wo'
        })
        .then(response => {
          response.should.have.status(403);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('Invalid token JsonWebTokenError: invalid token');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST /api/v1/owners/:id/homes', () => {
    it("should serve an error if token does not have admin rights", (done) => {
      chai.request(server)
        .post('/api/v1/owners/1/homes')
        .send({
          id: 10,
          houseName: 'luxury',
          description: 'holy magoly',
          bedrooms: 4,
          bathrooms: 4,
          houseAddress: '1234 down the road lane',
          zipCode: 80004,
          ownerId: 1,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVFbWFpbEBlbWFpbC5jb20iLCJhcHBOYW1lIjoiYXBwTmFtZSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTEzMzAxOTg1fQ.7W_UQVD251kMfB-CvnUiQWWIIzY6hpLZxBn802-vt6'
        })
        .then(response => {
          response.should.have.status(403);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('Invalid token JsonWebTokenError: invalid signature');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('POST /api/v1/owners/:id/homes', () => {
    it("should serve an error if a property is missing", (done) => {
      chai.request(server)
        .post('/api/v1/owners/1/homes')
        .send({
          id: 10,
          houseName: 'luxury',
          bedrooms: 4,
          bathrooms: 4,
          houseAddress: '1234 down the road lane',
          zipCode: 80004,
          ownerId: 1,
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjkyNzA4fQ.sT916KQPiD_sbT1Bkguu6VMvkwsWHUkAGHD_b7ul9wo'
        })
        .then(response => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.error.should.equal('You are missing the description property');
          done();
        })
        .catch(error => {
          throw error;
        });
    });
  });

  describe('/api/v1/owners/:id', () => {
  it('should return an updated home owner', (done) => {
    chai.request(server)
      .put('/api/v1/owners/2')
      .send({
        id: 2,
        firstName: 'ben the borifill',
        lastName: 'porter',
        streetAddress: '1234 borifill pl',
        zipCode: 80058,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjkyNzA4fQ.sT916KQPiD_sbT1Bkguu6VMvkwsWHUkAGHD_b7ul9wo'
      })
      .then((response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].id.should.equal(2);
        response.body[0].firstName.should.equal('ben the borifill');
        response.body[0].lastName.should.equal('porter');
        response.body[0].streetAddress.should.equal('1234 borifill pl');
        response.body[0].zipCode.should.equal(80058);
        done();
      })
      .catch((error) => {
        throw error;
      });
    });
  });

  describe('/api/v1/owners/:id', () => {
  it('should return an error if token is invalid', (done) => {
    chai.request(server)
      .put('/api/v1/owners/2')
      .send({
        id: 2,
        firstName: 'ben the borifill',
        lastName: 'porter',
        streetAddress: '1234 borifill pl',
        zipCode: 80058,
        token: 'eiJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjkyNzA4fQ.sT916KQPiD_sbT1Bkguu6VMvkwsWHUkAGHD_b7ul9wo'
      })
      .then((response) => {
        response.should.have.status(403);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.equal('Invalid token JsonWebTokenError: invalid token');
        done();
      })
      .catch((error) => {
        throw error;
      });
    });
  });

  describe('/api/v1/owners/:id', () => {
  it('should return an error if token does not have admin permission', (done) => {
    chai.request(server)
      .put('/api/v1/owners/2')
      .send({
        id: 2,
        firstName: 'ben the borifill',
        lastName: 'porter',
        streetAddress: '1234 borifill pl',
        zipCode: 80058,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVFbWFpbEBlbWFpbC5jb20iLCJhcHBOYW1lIjoiYXBwTmFtZSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNTEzMzAxOTg1fQ.7W_UQVD251kMfB-CvnUiQWWIIzY6hpLZxBn802-vt6'
      })
      .then((response) => {
        response.should.have.status(403);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.equal('Invalid token JsonWebTokenError: invalid signature');
        done();
      })
      .catch((error) => {
        throw error;
      });
    });
  });

  describe('/api/v1/owners/:id', () => {
  it('should return an error a property is missing', (done) => {
    chai.request(server)
      .put('/api/v1/owners/2')
      .send({
        id: 2,
        firstName: 'ben the borifill',
        streetAddress: '1234 borifill pl',
        zipCode: 80058,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdHVyaW5nLmlvIiwiYXBwTmFtZSI6InVzZXIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTEzMjkyNzA4fQ.sT916KQPiD_sbT1Bkguu6VMvkwsWHUkAGHD_b7ul9wo'
      })
      .then((response) => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.equal('You are missing the lastName property');
        done();
      })
      .catch((error) => {
        throw error;
      });
    });
  });

  describe('/api/v1/owners/:id', () => {
  it('should return an error a property is missing', (done) => {
    chai.request(server)
      .put('/api/v1/owners/90')
      .send({
        id: 2,
        firstName: 'ben the borifill',
        lastName: 'porter',
        streetAddress: '1234 borifill pl',
        zipCode: 80058,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWVFbWFpbEB0dXJpbmcuaW8iLCJhcHBOYW1lIjoiYXBwTmFtZSIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTMzMDIxMjR9.QS_7CB-WoiNjU_9dG5S6Fh0OiqG3fUD75W-8sjD38Vg'
      })
      .then((response) => {
        response.should.have.status(422);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.error.should.equal('Owner ID does not exist ${error}');
        done();
      })
      .catch((error) => {
        throw error;
      });
    });
  });

});
