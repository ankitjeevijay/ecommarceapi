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

            
            const{name,email,mobileNo,address,password, confirmPassword} = req.body
            const user = await UserModel.findOne({email:email})
            if(user){
                res.status(401).json({
                    success:true,
                    message:'user allready exist'
                })

            }else{
                if(name && email && mobileNo && address ){
                    if(password == confirmPassword){

                        const hashPassword = await bcrypt.hash(password,10)

                        const result = new UserModel({
                            name:name,
                            email:email,
                            mobileNo:mobileNo,
                            address:address,
                            password:hashPassword,
                            image:{
                                public_id: myimage.public_id,
                                url: myimage.secure_url
                             }
                        })
                        await result.save()
                        res.status(201).json({
                            success:true,
                            result
                        })

                    }else{
                        res.status(401).json({
                            success:true,
                            message:'password and confirmPassword does not matched'
                        })
                    }

                }else{
                    res.status(401).json({
                        success:true,
                        message:'All field are required'
                    })
                }

           }

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
    static Logout = async (req,res)=>{
        try{
            res.clearCookie('token')
            res.status(401).json({
                success:true,
                message:'Logout successfuly'
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
    static Profile = async (req, res)=>{
        try{
           const{name,email,_id} = req.admin
           const data = await UserModel.findById(_id)
           console.log(data)
        }catch(error){
            console.log(error)
        }
    }
    static ChangePassword = async (req, res)=>{
        try{
           // console.log(req.body)
           const{id} = req.admin
           const {oldpassword, newpassword, confirmpassword} = req.body
           if(oldpassword && newpassword && confirmpassword){
            if(newpassword == confirmpassword){
                const user = await UserModel.findById(id).select("+password")
                //console.log(user)
                const isMatch = await bcrypt.compare(oldpassword, user.password)
                console.log(isMatch)
                if(isMatch){
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(newpassword,salt)
                    await UserModel.findByIdAndUpdate(req.params.id,{
                        $set:{password:newHashPassword} 
                    });
                    res.status(201).json({
                        status:'success',
                        message:'Password Updated successfully'
                    })   
                }else{
                    res.status(400).json({
                        status:'failed',
                        message:'old password is incorrect'
                    })
                }
    
            }else{
                res.status(400).json({
                    status:'failed',
                    message:'New password and old password does not matched'
                })
            }
    
           }else{
            res.status(400).json({
                status:'failed',
                message:'All field are required'
            })
           }
        }catch(error){
          console.log(error)  
        }
    }


















}
module.exports = UserController