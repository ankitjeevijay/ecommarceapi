const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')

const Admin_auth = async  (req,res,next)=>{
    try{
        //console.log('hello user')
    const {token} = req.cookies
    //console.log(token)
    const verify_token = jwt.verify(token,'ankityadav123')
    //console.log(verify_token)
    const admin_data = await UserModel.findOne({_id: verify_token.id})
    //console.log(admin_data)
    req.admin = admin_data
    next()

    }catch(error){
        //console.error('error:', error.message);
        res.status(500).json({
           message:"you are not registered, after please Register than login"

        })
    }
    
}
module.exports = Admin_auth