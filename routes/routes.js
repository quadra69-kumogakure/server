"use strict"
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const contactController = require('../controllers/contactController');
const messageController = require('../controllers/messageController');
const conversationController = require('../controllers/conversationController');
const authentication = require('../middlewares/authentication');

router.get("/", (req, res) => {
    res.status(200).json({
        message : "Masukk"
    })
});

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.post("/google-login", userController.googleLogin);

router.use(authentication);

router.get("/user-data", userController.getUserData);

router.put("/update-profile", userController.updateProfile);

router.get("/contacts", contactController.displayContacts);

router.post("/contacts", contactController.addNewContact);

router.get("/contacts/:id", contactController.displayPerContact);

router.patch("/contacts/:id", contactController.changeContactName);

router.post("/messages", messageController.addMessage);

router.get("/conversations", conversationController.displayConversations);

router.get("/conversations/:id", conversationController.displayPerConversation);

router.post("/conversations", conversationController.addConversation);


module.exports = router;