const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { addContact, getContacts } = require("../controllers/ContactController");
const router = express.Router();

router.use(requireAuth);

router.post("/add", addContact);
router.get("/", getContacts);

module.exports = router;
