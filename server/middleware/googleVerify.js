const { OAuth2Client }  = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)


function googleVerify(req,res,next)
  {
      let id_token = req.body.id_token
      client.verifyIdToken({
          idToken : id_token,
          audience : process.env.CLIENT_ID
      })
      .then(result=>{
        req.verifiedUser = result.getPayload()
        next()
      })
      .catch(next)
  }

module.exports = googleVerify