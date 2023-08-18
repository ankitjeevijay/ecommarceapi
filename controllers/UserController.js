const UserModel = require('../models/UserModel')
class UserController{

    static Register = async (req, res) => {
        try{
            const{name,email,mobileNo,address} = req.body
            const result = new UserModel({
                name:name,
                email:email,
                mobileNo:mobileNo,
                address:address
            })
            await result.save()
            res.status(201).json({
                success:true,
                result
            })

        }catch(error){
            console.log(error)
        }

    }
    static GetAllUser = async (req, res)=>{
        try{
            const AllData = await UserModel.find()
            res.status(200).json({
                success:true,
                AllData
            
            })

        }catch(error){
            console.log(error)
        }
    }


















}
module.exports = UserController