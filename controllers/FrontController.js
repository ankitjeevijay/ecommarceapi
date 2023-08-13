const registerModel = require('../models/Register')

class FrontController {

    static Register = async (req, res) => {
        try{
            const{name,email,mobileNo,address} = req.body
            const result = new registerModel({
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




}
module.exports = FrontController