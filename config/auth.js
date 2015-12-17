module.exports = {
 facebookAuth: {
    'clientID'      : '1495994050704305', // your App ID
    'clientSecret'  : '048eef1bdcaed3fb2875dfd77c98f5af', // your App Secret
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  },
  twitterAuth: {
    'consumerKey'       : 'your-consumer-key-here',
    'consumerSecret'    : 'your-client-secret-here',
    'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
  },
  googleAuth: {
    'clientID'      : '945259520927-tb0mi265fam83nek60ght4u0ur8djp41.apps.googleusercontent.com',
    'clientSecret'  : 'SOkmkKBowXnhgGlFeUjd_GR0',
    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
  }, 
  jwtKey: 'aixpen94kgHsp3J',
  jwtOptions: { //See @node-jsonwebtoken sign for options
    expiresInMinutes: 1440,
    subject: 'auth',
    issuer: 'cmusocial.com',
    audience: 'plant_minder'
  }
}
