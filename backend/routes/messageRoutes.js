const express = require("express")
const {requireAuth} = require("../middleware/requireAuth")
const {sendMessage,getHistory,getConversation} = require("../controllers/messageControllers")


const messageRoutes = (io) =>{
const router = express.Router()
router.use(requireAuth)

router.post('/send',sendMessage(io))
router.get('/history',getHistory)
router.get("/getConversation/:otheruseruid",getConversation)
return router
}

module.exports = messageRoutes