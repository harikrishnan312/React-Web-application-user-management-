const jwt = require('jsonwebtoken');

const Admin = require('../model/adminModel')

require('dotenv').config();

function adminAuth(req, res, next) {
  try {

    const token = req.header('Authorization').replace('Bearer ', '');

    jwt.verify(token, process.env.ADMINSECRET, async (err, decoded) => {

      if (err) {
        return res.json({ error: 'Unauthorized' });
      }

      const adminId = decoded.id;
      req.admin = await Admin.findById(adminId);

      next();
    });
a
  } catch (error) {
    res.status(401).json("You are not authenticated !!");
  }
}

module.exports = adminAuth;
