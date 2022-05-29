const User = require('../models/userModels');
const bycryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
           // Password encryption
           const passwordHash = await bycryptjs.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: passwordHash,
                role
            });
            // save mongodb
            await newUser.save();
            // Then create jsonwebtoken to authentication
            const accessToken =createAccessToken({id:newUser._id})
            const refreshToken =createrefreshToken({id:newUser._id})

            res.cookie('refreshtoken',refreshToken,{
                httpOnly:true,
                path :'user/refreshtoken'
            })
            res.json({accessToken})
            // res.json({
            //     msg: 'User created'
            // });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: 'Server Error'
            });
        }
    },
    login: async(req, res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({msg:'User does not exist'})
        const isMatch = await bycryptjs.compare(password,user.password)
        if(!isMatch) return res.status(400).json({msg:'Incorrect password'})
        
    }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    refreshToken: async(req, res) => {
      try {
        const refreshToken = req.cookies.refreshtoken
        if(!refreshToken) return res,status(400).json({msg:"Please Loginor Register"})
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        if(err) return res.status(401).json({msg:"Please Loginor Register"})
        const accessToken = createAccessToken({id:user.id})
        res.json({user,accessToken})
        })
      } catch (error) {
          
      }
    }
};
const createAccessToken=(user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}
const createrefreshToken=(user)=>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
}

module.exports = userCtrl;