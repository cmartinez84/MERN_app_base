module.exports = {
  // database: 'mongodb://localhost:21017/<dbName>',
  database: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ds261678.mlab.com:61678/sample_mern`,
  secret: 'mybabysgotasecret'
}


// mongodb://<dbuser>:<dbpassword>@ds261678.mlab.com:61678/sample_mern
