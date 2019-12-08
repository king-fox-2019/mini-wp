module.exports = function passwordRandomizer (){


const dict = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const passLength = Math.max( Math.round(Math.random() * 15), 5)

let passwordRandom=''
for (let x = 0; x < passLength; x++)
  {
    passwordRandom += dict[Math.round( Math.random()*(dict.length-1) )]
  }

return passwordRandom
}

