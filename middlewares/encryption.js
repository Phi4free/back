const bcrypt = require('bcrypt');

async function encryptPassword(plainPassword) {
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
  } catch (err) {
    console.error(err);
    throw err; // or handle the error appropriately
  }
}


function validatePassword(userInput, dbPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(userInput, dbPassword, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


module.exports = { encryptPassword, validatePassword };