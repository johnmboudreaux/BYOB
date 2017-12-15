/*eslint-disable */
exports.seed = function(knex, Promise) {
  return knex('homes').del()
    .then(() => knex('home_owner').delete())
    .then(() => {
      return Promise.all([
        knex('home_owner').insert([
          {
            id:1,
            firstName: 'John',
            lastName: 'Boudreaux',
            streetAddress: '6825 Garrison St.',
            zipCode: 80004
          },
          {
            id:2,
            firstName: 'Ben',
            lastName: 'Porter',
            streetAddress: '4183 W. Walsh Pl.',
            zipCode: 80219
          },
          {
            id:3,
            firstName: 'Robbie',
            lastName: 'Greiner',
            streetAddress: '8673 W. Ivy St',
            zipCode: 80219
          },
          {
            id:4,
            firstName: 'Adam',
            lastName: 'Mescher',
            streetAddress: '44 Glen Dr.',
            zipCode: 94930
          },
          {
            id:5,
            firstName: 'Nick',
            lastName: 'Teets',
            streetAddress: '404 W. Lamme St.',
            zipCode: 59715
          }
        ])
          .then(response => {
            return knex('homes').insert([
              {
                id:1,
                houseName: 'Cloud House',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '2104 Westfall Avenue',
                bathrooms: '5',
                bedrooms: '5',
                zipCode: '80221',
                ownerId: 1
              },
              {
                id:2,
                houseName: 'Artist Road',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '1330 Cooks Mine Road',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: 2
              },
              {
                id:3,
                houseName: 'Vista De Colores',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '788 South Oklahoma Court',
                bathrooms: '2',
                bedrooms: '4',
                zipCode: '80128',
                ownerId: 3
              },
              {
                id:4,
                houseName: 'Casita Don Manuel',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '431 East Gainsway St.',
                bathrooms: '1',
                bedrooms: '1',
                zipCode: '80004',
                ownerId: 4
              },
              {
                id:5,
                houseName: 'Cubero Casita',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '7960 LakeView Street',
                bathrooms: '1',
                bedrooms: '1',
                zipCode: '87501',
                ownerId: 5
              },
              {
                id:6,
                houseName: 'El Nido',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '607 Old Santa Fe Trail',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: 1
              },
              {
                id:7,
                houseName: 'Southwest at the Railyard',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '4 Paris Hill Court',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: 2
              },
              {
                id:8,
                houseName: 'Casa De Lorena',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '9399 W. Tallwood Dr.',
                bathrooms: '1',
                bedrooms: '1',
                zipCode: '87501',
                ownerId: 1
              }
            ]);
          })
          .then(home => {
            home
          })
          .catch(error => console.log(`Error seeding data ${ error }`))
      ]);
    })
    .catch(error => console.log(`Error Seeding Data: ${ error }`));
};
