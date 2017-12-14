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

    describe('GET /api/v1/homes', () => {
      it("should return all homes", (done) => {
        chai.request(server)
          .get('/api/v1/homes')
          .then(response => {
            console.log(response);
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


});
