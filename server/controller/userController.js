

const User = require('../model/userModel')

// const Admin = require('../model/adminModel')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const securePassword = require('../middleWare/bcrypt')

require('dotenv').config();

const userSignUp = async (req, res) => {
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
    }
}

const verifyLogin = async (req, res) => {
    try {

        const user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            password = req.body.password;
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                if (!user.isBlocked) {
                    const token = jwt.sign({
                        name: user.name,
                        email: user.email,
                        id: user._id
                    }, process.env.SECRETKEY)
                    res.json({ status: 'ok', user: true, token })
                } else {
                    res.json({ status: 'error', user: 'blocked' })
                }
            } else {
                res.json({ status: 'error', user: false })
            }
        } else {
            res.json({ status: 'error', user: false })

        }

    } catch (error) {
        console.log(error.message);
    }
}

const userHome = async (req, res) => {
    try {

        if (req.user) {
            const user = await User.findOne({ email: req.user.email })
            res.json({ user: true, name: user.name, email: user.email });
        } else {
            res.json({ error: 'error' });
        }

    } catch (error) {
        console.log(error.message);
    }
}

const userProfile = async (req, res) => {
    try {

        if (req.user) {
            const details = await User.findOne({ email: req.user.email })
            res.json({ user: true, userDetails: details });
        } else {
            res.json({ error: 'error' });
        }

    } catch (error) {
        console.log(error.message);
    }
}

const addProfile = async (req, res) => {
    try {

        if (req.file) {
            const image = await User.updateOne({ email: req.body.email }, { $set: { image: req.file.filename } })
            if (image) {
                res.json({ status: 'ok', image: req.file.filename })
            } else {
                console.log('error');
            }
        }

    } catch (error) {
        console.log(error.message);
    }

}

const userEdit = async (req, res) => {
    try {
        const password = req.body.password
        const newPass = req.body.newPass
        const user = await User.findOne({ _id: req.body.id });

        if (password && newPass) {

            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const spassword = await securePassword(newPass)
                    const updated = await User.updateOne({ _id: req.body.id }, { $set: { name: req.body.userName, password: spassword } })
                    if (updated) {
                        const data = await User.findOne({ _id: req.body.id })
                        res.json({ status: 'ok', user: data })
                    }
                }
            }
        } else {
            const updated = await User.updateOne({ _id: req.body.id }, { $set: { name: req.body.userName } })
            if (updated) {
                const data = await User.findOne({ _id: req.body.id })
                res.json({ status: 'ok', user: data })
            }
        }

    } catch (error) {
        console.log(error.message);
    }

}



module.exports = {
    userSignUp,
    verifyLogin,
    userHome,
    userProfile,
    addProfile,
    userEdit


}