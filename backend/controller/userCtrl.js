const User = require('../models/userModels');

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
            const newUser = new User({
                name,
                email,
                password,
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