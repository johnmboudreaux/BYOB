
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
                houseName: 'Cloud House',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '2104 Westfall Avenue',
                bathrooms: '5',
                bedrooms: '5',
                zipCode: '87501',
                ownerId: home[0]
              },
              {
                houseName: 'Artist Road',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '1330 Cooks Mine Road',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[1]
              },
              {
                houseName: 'Vista De Colores',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '788 South Oklahoma Court',
                bathrooms: '2',
                bedrooms: '4',
                zipCode: '87501',
                ownerId: home[2]
              },
              {
                houseName: 'Casita Don Manuel',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '431 East Gainsway St.',
                bathrooms: '1',
                bedrooms: '1',
                zipCode: '87501',
                ownerId: home[3]
              },
              {
                houseName: 'Cubero Casita',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '7960 LakeView Street',
                bathrooms: '1',
                bedrooms: '1',
                zipCode: '87501',
                ownerId: home[4]
              },
              {
                houseName: 'El Nido',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '607 Old Santa Fe Trail',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[5]
              },
              {
                houseName: 'Southwest at the Railyard',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '4 Paris Hill Court',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[6]
              },
              {
                houseName: 'Casa De Lorena',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '9399 W. Tallwood Dr.',
                bathrooms: '1',
                bedrooms: '1',
                zipCode: '87501',
                ownerId: home[7]
              },
              {
                houseName: 'Los Nidos',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '401 Charles Dr',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[8]
              },
              {
                houseName: 'Alma Compound Casita',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '836 Durham Lane',
                bathrooms: '1',
                bedrooms: '1',
                zipCode: '87501',
                ownerId: home[9]
              },
              {
                houseName: 'An Enchanting Casita',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '131 South Foster St.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[10]
              },
              {
                houseName: 'Cowboy Song',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '9079 Gates Drive',
                bathrooms: '1',
                bedrooms: '1',
                zipCode: '87501',
                ownerId: home[11]
              },
              {
                houseName: 'Casa Vistoso',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '386 N. Eagle Ave.',
                bathrooms: '3',
                bedrooms: '3',
                zipCode: '87501',
                ownerId: home[12]
              },
              {
                houseName: 'Casa Sin Nombre',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '7565 Arnold Street',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[13]
              },
              {
                houseName: 'Butterfly House',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '954 Homestead St.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[14]
              },
              {
                houseName: 'Eastside Enchantment',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '71 Gainsway Ln.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[15]
              },
              {
                houseName: 'Vista del Ceielo',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '24 South Oxford St.',
                bathrooms: '3',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[16]
              },
              {
                houseName: 'Alameda Loft',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '7207 Lake View Street',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[17]
              },
              {
                houseName: `Susan's Hideaway`,
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '9 EdgeField Dr',
                bathrooms: '2',
                bedrooms: '3',
                zipCode: '87501',
                ownerId: home[18]
              },
              {
                houseName: 'Cowboy on the Acequia',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '39 Cambridge Ave.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[19]
              },
              {
                houseName: 'La Vida Buena',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '323 W. Longfellow St.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87501',
                ownerId: home[20]
              },
              {
                houseName: 'City Views at Alma Compound',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '420 Forest Ave.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87505',
                ownerId: home[21]
              },
              {
                houseName: 'El Otro Mundo',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '663 Trout St.',
                bathrooms: '5',
                bedrooms: '5',
                zipCode: '87505',
                ownerId: home[22]
              },
              {
                houseName: 'Western Cowboy',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '95 Edgewater Street',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87505',
                ownerId: home[23]
              },
              {
                houseName: 'Garcia Street Gardens',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '967 Arnold Rd.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87505',
                ownerId: home[24]
              },
              {
                houseName: 'Casa Kearney',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: 'Casa Kearney',
                bathrooms: '3',
                bedrooms: '2',
                zipCode: '87505',
                ownerId: home[15]
              },
              {
                houseName: 'Canyon Road Cassidy Compound',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '364 Roehampton Dr.',
                bathrooms: '3',
                bedrooms: '3',
                zipCode: '87505',
                ownerId: home[25]
              },
              {
                houseName: 'Rising Sun at the Plaza',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '7018 Old Smith Ave.',
                bathrooms: '1',
                bedrooms: '1',
                zipCode: '87505',
                ownerId: home[26]
              },
              {
                houseName: `Bishops's Scenic Views`,
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '9174 Dogwood Dr.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87505',
                ownerId: home[27]
              },
              {
                houseName: 'Alma Compound Oasis',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '220 El Dorado Street',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87507',
                ownerId: home[28]
              },
              {
                houseName: 'Burro Garden',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '27 N. Paris Hill Ct.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87507',
                ownerId: home[29]
              },
              {
                houseName: 'Cowboy Villa',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '397 North Sage Street',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87507',
                ownerId: home[1]
              },
              {
                houseName: 'Santa Fe Treasure',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '199 Glen Creek Ln.',
                bathrooms: '2',
                bedrooms: '3',
                zipCode: '87507',
                ownerId: home[2]
              },
              {
                houseName: 'Mostar Cielo Casa',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '281 John Ave.',
                bathrooms: '2',
                bedrooms: '2',
                zipCode: '87507',
                ownerId: home[3]
              },
              {
                houseName: 'Puertas de Canyon Rd.',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '7586 Durham Ct.',
                bathrooms: '3',
                bedrooms: '4',
                zipCode: '87507',
                ownerId: home[17]
              },
              {
                houseName: 'Pinon Sanctuary',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '435 Manor Station Dr.',
                bathrooms: '6',
                bedrooms: '5',
                zipCode: '87507',
                ownerId: home[22]
              },
              {
                houseName: 'Plaza Splendor',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '96 Old 3rd Ave.',
                bathrooms: '3',
                bedrooms: '3',
                zipCode: '87507',
                ownerId: home[6]
              },
              {
                houseName: 'Harmony House',
                description: 'Lorem ipsum dolor sit amet, nam ea impetus discere, vel laoreet accumsan noluisse an. Altera petentium eos et, ei commodo virtute sanctus mei.',
                houseAddress: '7721 Miles St.',
                bathrooms: '2',
                bedrooms: '3',
                zipCode: '87507',
                ownerId: home[19]
              }
            ]);
          })
          .then(home => console.log(`Seeding Complete for: ${ home }`))
          .catch(error => console.log(`Error seeding data ${ error }`))
      ]);
    })
    .catch(error => console.log(`Error Seeding Data: ${ error }`));
};
