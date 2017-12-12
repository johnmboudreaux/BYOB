
exports.seed = function(knex, Promise) {
  return knex('homes').del()
    .then(() => knex('home_owner').delete())
    .then(() => {
      return Promise.all([
        knex('home_owner').insert([
          {
            firstName: 'John',
            lastName: 'Boudreaux',
            streetAddress: '6825 Garrison St.',
            zipCode: 80004
          },
          {
            firstName: 'Ben',
            lastName: 'Porter',
            streetAddress: '4183 W. Walsh Pl.',
            zipCode: 80219
          },
          {
            firstName: 'Robbie',
            lastName: 'Greiner',
            streetAddress: '8673 W. Ivy St',
            zipCode: 80219
          },
          {
            firstName: 'Adam',
            lastName: 'Mescher',
            streetAddress: '44 Glen Dr.',
            zipCode: 94930
          },
          {
            firstName: 'Nick',
            lastName: 'Teets',
            streetAddress: '404 W. Lamme St.',
            zipCode: 59715
          },
          {
            firstName: 'Hector',
            lastName: 'Sanchez',
            streetAddress: '7168 W. Chestnut Dr.',
            zipCode: 80128
          },
          {
            firstName: 'Jen',
            lastName: 'Woodson',
            streetAddress: '4 Counchas Loop',
            zipCode: 59715
          },
          {
            firstName: 'Nic',
            lastName: 'Bornemeir',
            streetAddress: '23 Main St.',
            zipCode: 59715
          },
          {
            firstName: 'Danny',
            lastName: 'Trujillo',
            streetAddress: '3451 Upham Pl.',
            zipCode: 80128
          },
          {
            firstName: 'Alex',
            lastName: 'Banister',
            streetAddress: '404 W. Lamme St.',
            zipCode: 59715
          },
          {
            firstName: 'Lola',
            lastName: 'Brenner',
            streetAddress: '7940 Valley View Dr.',
            zipCode: 80221
          },
          {
            firstName: 'Luke',
            lastName: 'Finney',
            streetAddress: '38 Weekly St.',
            zipCode: 78237
          },
          {
            firstName: 'Rufus',
            lastName: 'Welsh',
            streetAddress: '2998 Collins Ave.',
            zipCode: 43228
          },
          {
            firstName: 'Amy',
            lastName: 'Holt',
            streetAddress: '1234 Medow Crest Ln.',
            zipCode: 41143
          },
          {
            firstName: 'Tyler',
            lastName: 'Kurchinski',
            streetAddress: '3096 Drainer Ave.',
            zipCode: 80128
          },
          {
            firstName: 'Zoe',
            lastName: 'Jones',
            streetAddress: '404 W. Lamme St.',
            zipCode: 59715
          },
          {
            firstName: 'Jacob',
            lastName: 'Smith',
            streetAddress: '3823 Rain Tree Blvd.',
            zipCode: 78240
          },
          {
            firstName: 'John',
            lastName: 'Doe',
            streetAddress: '1777 Fidler Dr.',
            zipCode: 78240
          },
          {
            firstName: 'Mary',
            lastName: 'Jane',
            streetAddress: '3511 Harley Dr',
            zipCode: 44070
          },
          {
            firstName: 'Mike',
            lastName: 'Scott',
            streetAddress: '2650 Codey Ridge Rd.',
            zipCode: 74730
          },
          {
            firstName: 'Noelle',
            lastName: 'Schwartz',
            streetAddress: '1361 Pritcher Ct.',
            zipCode: 55049
          },
          {
            firstName: 'Bill',
            lastName: 'Nye',
            streetAddress: '3469 Freedon Ln.',
            zipCode: 14626
          },
          {
            firstName: 'Sarah',
            lastName: 'Market',
            streetAddress: '1938 Romrog Wy.',
            zipCode: 80286
          },
          {
            firstName: 'Katie',
            lastName: 'McGreggor',
            streetAddress: '3961 Meadow Ln.',
            zipCode: 94612
          },
          {
            firstName: 'Bridget',
            lastName: `O'Fogotery`,
            streetAddress: '1376 Lyndon St.',
            zipCode: 19088
          },
          {
            firstName: 'Eddy',
            lastName: 'Market',
            streetAddress: '417 Hamilton Dr.',
            zipCode: 21401
          },
          {
            firstName: 'Greg',
            lastName: 'White',
            streetAddress: '1705 Karen Ln.',
            zipCode: 21401
          },
          {
            firstName: 'Marcia',
            lastName: 'Leary',
            streetAddress: '1489 Meadow Brook Mall Rd.',
            zipCode: 90017
          },
          {
            firstName: 'Katrina',
            lastName: 'Neil',
            streetAddress: '4011 Waterview Ln.',
            zipCode: 61813
          },
          {
            firstName: 'Lesley',
            lastName: 'Davis',
            streetAddress: '2792 Robinson Ln.',
            zipCode: 78659
          }
        ], 'id')
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
