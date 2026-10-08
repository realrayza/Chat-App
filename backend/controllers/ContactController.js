const User = require("../models/usermodel");
const mongoose = require("mongoose");

const addContact = async (req, res) => {
  const { contactUid, contactName } = req.body;
  const userId = req.userId;
  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw Error("Invalid Authentication");
    }
    if(contactUid === req.nkataId){
      throw Error("You can't add yourself")
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw Error("User doesn't exist");
    }
    const contactId = await User.findOne({ nkataId: contactUid });
    if (!contactId) {
      throw Error("User doesn't exist");
    }
    const updateContact = await User.findOneAndUpdate(
      {
        _id: userId,
        "contact._id": { $ne: contactId._id },
      },
      { $push: { contact: { uid: contactId.nkataId, name: contactName } } },
      { new: true },
    );

    if(!updateContact){
        throw Error('Contact already exists')
    }
    
    res.status(201).json({contact:{ name: updateContact.contact.name,contactId: updateContact.contact.uid}})
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getContacts = async (req,res)=>{
   const userId = req.userId;
   try {
    const user = await User.findOne({_id: userId})
    
    if(!user.contact){
      res.status(201).json("No contact saved")
    }
   
    res.status(201).json({contact:user.contact})
   } catch (error) {
    res.status(500).json(error.message)
    
   }
}
module.exports = {addContact,getContacts}
