const bcrypt = require('bcrypt')

const securePassword = async (password) => {
    try {
        const passwordHAsh = await bcrypt.hash(password, 10);
        return passwordHAsh;
    }
    catch (error) {
        console.log(error.message);
    }
  }
  module.exports = securePassword;