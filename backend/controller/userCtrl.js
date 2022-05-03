const User = require('../models/userModels');
const bycryptjs = require('bcryptjs');

const userCtrl = {
    signup: async(req, res) => {
        try {
            const {
                name,
                email,
                password,
                role
            } = req.body;
            const user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: 'User already exists'
                });
            }
            if(password.length<6){
                return res.status(400).json({
                    msg: 'Password must be at least 6 characters'
            })
           }
           const passwordHash = await bycryptjs.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: passwordHash,
                role
            });
            await newUser.save();
            res.json({
                msg: 'User created'
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Server Error'
            });
        }
    },
};


module.exports = userCtrl;