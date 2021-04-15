require('dotenv').config()
const { Router } = require("express");
const router = Router();
const Note = require('../models/Note')
const auth = require('../middleware/search-user')


router.post('/create', auth, async (req, res) => {



    try {
        

const {title} = req.body
const {content} = req.body

const note = new Note({
    title, content, user: req.user.userId
})

await note.save()
res.status(201).json({note})

      } catch (error) {
        res.status(500).json({ message: "Something went *really wrong*, try again" });
      }
    

})


router.get('/', auth, async (req, res) => {


    try {
        
const notes = await Note.find({user: req.user.userId})  
res.json(notes)





    } catch (error) {
      res.status(500).json({ message: "Something went *really wrong*, try again" });
    }




})


router.delete('/delete', auth, async (req, res) => {


    try {
        console.log('this is body from note routes',req.body)
const notes = await Note.deleteOne({user: req.user.userId, _id: req.body})  
res.json(notes)





    } catch (error) {
      res.status(500).json({ message: "Something went *really wrong*, try again" });
    }




})







module.exports = router