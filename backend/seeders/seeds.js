const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Trip = require('../models/Trip');
const bcrypt = require('bcryptjs');


const users = [];

users.push(
  new User ({
    email: 'demo@email.com',
    name: 'Demo User',
    hashedPassword: bcrypt.hashSync('password', 10),
  })
)

users.push(
  new User ({
    email: 'shawna@email.com', 
    name: 'Shawna',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    email: 'charles@email.com', 
    name: 'Charles',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    email: 'lynsie@email.com', 
    name: 'Lynsie',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    email: 'emmett@email.com', 
    name: 'Emmett',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

users.push(
  new User ({
    email: 'janira@email.com', 
    name: 'Janira',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)

const trips =[]

trips.push(
  new Trip ({
    title: 'EurpTrip 2022',
    startDate: '2022-08-01',
    endDate: '2022-08-22',
    description: 'couple weeks in Germany, Denmark, and Sweden',
    location: {
      country: 'Germany'
    },
    organizer: '63f592b50326647fe09d333d',
    members: ['63f592b50326647fe09d333d', '63f592b50326647fe09d333e', '63f592b50326647fe09d333f', '63f592b50326647fe09d3340']
  })
)

trips.push(
  new Trip ({
    title: 'Colombia NYE',
    startDate: '2022-12-28',
    endDate: '2023-01-02',
    description: 'New Years Eve in Colombia',
    location: {
      country: 'Colombia'
    },
    organizer: '63f592b50326647fe09d333d',
    members: ['63f592b50326647fe09d333d', '63f592b50326647fe09d333e', '63f592b50326647fe09d333f', '63f592b50326647fe09d3340']
  })
)

trips.push(
  new Trip ({
    title: "Megan's Wedding in Mexico",
    startDate: '2023-03-08',
    endDate: '2023-03-19',
    description: "Mexico for Megan's wedding on March 11, and staying for the next week",
    location: {
      country: 'Mexico',
      city: 'Mexico City'
    },
    organizer: '63f592b50326647fe09d333d',
    members: ['63f592b50326647fe09d333d', '63f592b50326647fe09d333e', '63f592b50326647fe09d333f', '63f592b50326647fe09d3340']
  })
)

trips.push(
  new Trip ({
    title: "Weekend in the Catskills",
    startDate: '2023-03-31',
    endDate: '2023-04-02',
    description: "Weekend away in the mountains after bootcamp",
    location: {
      country: 'USA',
      state: 'New York'
    },
    organizer: '63f592b50326647fe09d333e',
    members: ['63f592b50326647fe09d333d']
  })
)

trips.push(
  new Trip ({
    title: "MDW in Fire Island",
    startDate: '2023-05-26',
    endDate: '2023-05-29',
    description: "Weekend away at the beach",
    location: {
      country: 'USA',
      state: 'New York'
    },
    organizer: '63f4e03c92f77b866e5c2807',
    members: ['63f592b50326647fe09d333d', '63f592b50326647fe09d333e', '63f592b50326647fe09d333f', '63f592b50326647fe09d3340']
  })
)

trips.push(
  new Trip ({
    title: "England for Vicky and Mikyle's wedding",
    startDate: '2023-08-18',
    endDate: '2023-08-31',
    description: "England for Vicky and Mikyle's wedding on Aug 28, staying the week before",
    location: {
      country: 'England'
    },
    organizer: '63f592b50326647fe09d333d',
    members: ['63f592b50326647fe09d333d', '63f592b50326647fe09d333e', '63f592b50326647fe09d333f', '63f592b50326647fe09d3340']
  })
)



mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    // insertSeeds();
    insertTripSeeds();
    console.log('Finished')
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting users...");
  User.collection.drop()
                .then(() => User.insertMany(users))
                .then(() => {
                  mongoose.disconnect();
                })
                .catch(err => {
                  console.error(err.stack);
                  process.exit(1);
                });
};

const insertTripSeeds = () => {
  console.log("Resetting trips...");
    Trip.collection.drop()
                .then(() => Trip.insertMany(trips))
                .then(() => {
                  mongoose.disconnect();
                })
                .catch(err => {
                  console.error(err.stack);
                  process.exit(1);
                });
};
