const UserModel = require('../models/UserModel')
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



cloudinary.config({ 
    cloud_name: 'dkwdscz4l', 
    api_key: '388856688969765', 
    api_secret: '7S0v5WOk8Yw-0QyIr1HjBj1Wifw'
    
  });


class UserController{

    static Register = async (req, res) => {
        try{

            const file = req.files.image
           const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:"Ecommarce",
           })
          // console.log(myimage)

            
        //     const{name,email,mobileNo,address,password, confirmPassword} = req.body
        //     const user = await UserModel.findOne({email:email})
        //     if(user){
        //         res.status(401).json({
        //             success:true,
        //             message:'user allready exist'
        //         })

        //     }else{
        //         if(name && email && mobileNo && address ){
        //             if(password == confirmPassword){

        //                 const hashPassword = await bcrypt.hash(password,10)

        //                 const result = new UserModel({
        //                     name:name,
        //                     email:email,
        //                     mobileNo:mobileNo,
        //                     address:address,
        //                     password:hashPassword
        //                 })
        //                 await result.save()
        //                 res.status(201).json({
        //                     success:true,
        //                     result
        //                 })

        //             }else{
        //                 res.status(401).json({
        //                     success:true,
        //                     message:'password and confirmPassword does not matched'
        //                 })
        //             }

        //         }else{
        //             res.status(401).json({
        //                 success:true,
        //                 message:'All field are required'
        //             })
        //         }

        //    }

        }catch(error){
            console.log(error)
        }

    }
    static VerifyLogin = async (req, res)=>{
        try{
            //console.log(req.body)
            const{email, password} = req.body
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user != null){

                    const ismatched =  await bcrypt.compare(password ,user.password)
                    if(ismatched){
                        //generate jwt
                        const token = jwt.sign({id:user._id}, 'ankityadav123')
                        //console.log(token)
                        res.cookie('token',token)
                        res.status(401).json({
                            success: true,
                            message:  "login successfully",
                            token: token,
                            user,
        
                        })

                    }else{
                        res.status(401).json({
                            success:true,
                            message:"email or password does not matched"
                        })
                    }

                }else{
                    res.status(401).json({
                        success:true,
                        message:"You are not registerd"
                    })
                }

            }else{
                res.status(401).json({
                    success:true,
                    message:"all field are required"
                })
            }



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