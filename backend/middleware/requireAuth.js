const jwt = require("jsonwebtoken")
const User = require("../models/usermodel")

const verifyToken = (token)=>{
    return jwt.verify(token,process.env.SECRET)
}

const requireAuth =async (req,res,next)=>{

    const {authorization}= await req.headers
    if(!authorization){
        throw Error('unauthorized')
    }
    const token = await authorization
    try{
        const payload = verifyToken(token)
        req.userId = payload._id
        req.uid = payload.uid
        req.nkataId = payload.nkataId
    
        next()
        }catch{
            throw Error('invalid or expired token')
        }
}


module.exports ={verifyToken,requireAuth}