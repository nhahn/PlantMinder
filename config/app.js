module.exports = {
  database: (process.env.MONGODB_SERVICE_PORT)? 'mongodb://' + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGODB_SERVICE_HOST + ":" + process.env.MONGODB_SERVICE_PORT + '/plants' : 'localhost/plants', 
  port: 8080,
  production: (process.env.MONGODB_SERVICE_PORT)? true:false,
  googleKey: "AIzaSyDoJ1SgGEu4p4JsEE4Z4LUz9J1FFz3Vv3M ",
  firmwareVersion: '0.0.2',
  firmwareMD5: 'c1405c7d61b95d8d39087887229805e5'
}
