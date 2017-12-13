
exports.seed = function(knex, Promise) {
  return knex('homes').del()
    .then(() => knex('home_owner').delete())
    .then(() => {
      return Promise.all([
        knex('home_owner').insert({

        }, 'id')
          .then(home => {
            return knex('homes').insert([
              {
                houseName: 'home1',
                houseAddress: '1234 whatnot',
                description: 'two story',
                bathrooms: '3',
                bedrooms: '4',
                zipCode: '80004',
                ownerId: home[0]
              },
              {
                houseName: 'home2',
                houseAddress: '4567 my house is smaller',
                description: 'ranch',
                bathrooms: '2',
                bedrooms: '3',
                zipCode: '80005',
                ownerId: home[0]
              }
            ]);
          })
          .then(home => console.log(`Seeding Complete for: ${ home }`))
          .catch(error => console.log(`Error seeding data ${ error }`))
      ]);
    })
    .catch(error => console.log(`Error Seeding Data: ${ error }`));
};
