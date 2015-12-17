module.exports = {
  database: process.env.MONGODB_URL || 'localhost/plantMinder',
  ip: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
  port: process.env.OPENSHIFT_NODEJS_PORT || 8080,
  production: (process.env.OPENSHIFT_NODEJS_IP)? true:false
}
