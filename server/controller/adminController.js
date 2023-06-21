

const Admin = require('../model/adminModel')

const User = require('../model/userModel')

const jwt = require('jsonwebtoken')

const securePassword = require('../middleWare/bcrypt')

require('dotenv').config();

const bcrypt = require('bcrypt')



const adminLogin = async (req, res) => {
    try {

        const admin = await Admin.findOne({
            email: req.body.email,
        })
        if (admin) {
            password = req.body.password;
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (passwordMatch) {
                const token = jwt.sign({
                    name: admin.name,
                    email: admin.email,
                    id: admin._id

                }, process.env.ADMINSECRET)
                res.json({ status: 'ok', admin: token })
            } else {
                res.json({ status: 'error', admin: false })
            }
        } else {
            res.json({ status: 'error', admin: false })
        }

    } catch (error) {
        console.log(error.message);
    }
}

const adminHome = async (req, res) => {
    try {
        // console.log(req.admin);
        if (req.admin) {
            const users = await User.find();
            res.json({ admin: true, name: req.admin.name, email: req.admin.email, users: users });
        } else {
            res.json({ error: 'error' });
        }
    } catch (error) {
        console.log(error.message);
    }
}

const adminUserupdate = async (req, res) => {
    try {

        const update = await User.updateOne({ _id: req.body.id }, {
            $set: { name: req.body.userName }
        })

        if (update) {
            res.json({ status: "ok" })
        } else {
            res.json({ status: 'error' })
        }

    } catch (error) {
        console.log(error.message);
    }
}

const userBlock = async (req, res) => {
    try {

        if (req.body.status === 'unblocked') {
            const update = await User.updateOne({ _id: req.body.id }, { $set: { isBlocked: true } })
            const users = await User.find();
            res.json({ status: 'ok', users: users })
        } else {
            const update = await User.updateOne({ _id: req.body.id }, { $set: { isBlocked: false } })
            const users = await User.find();
            res.json({ status: 'ok', users: users })
        }

    } catch (error) {
        console.log(error.message);
    }
}

const userCreate = async (req, res) => {
    try {

        spassword = await securePassword(req.body.password)
        const user = new User({
            name: req.body.userName,
            email: req.body.email,
            password: spassword
        })
        await user.save()
        res.json({ status: 'ok' });

    } catch (error) {
        res.json({ status: 'error', error: 'Duplicate email' })
        console.log(error.message);
    }

}




module.exports = {
    adminLogin,
    adminHome,
    adminUserupdate,
    userBlock,
    userCreate
}