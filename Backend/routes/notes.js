const express=require('express')
const router=express.Router()
const Notes=require('../models/Notes')
const fetchuser=require('../middlewares/fetchuser')
const {body,validationResult}=require('express-validator');


//1.Get all the notes from database
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
        const notes=await Notes.find({user:req.user.id})
        res.send(notes)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
   
})

// 2. Add notes.
router.post('/addnote',fetchuser,[
body('title',"Enter a Valid Title").isLength({min:3}),
body('description',"Minimum Length is 5").isLength({min:5})],async (req,res)=>{

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {title,description,tag}=req.body;
    try {
        const note=new Notes({title,description,tag,user:req.user.id})
        const savedNote=await note.save();
        res.status(200).send(savedNote);

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
    }
})

// 3.Update a note
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    
        const {title,description,tag}=req.body;
    
        try {
             //    create a new Not object
           const newNote={}
           if(title){newNote.title=title; }
           if(description){newNote.description=description; }
           if(tag){newNote.tag=tag; }

        //    find the note and update it
          let note=await Notes.findById(req.params.id)
          if(!note)
          {
             return res.status(404).send("Not Found")
          }
          
          if(note.user.toString()!==req.user.id)
          {
            return res.status(401).send('Not Allowed')
          }

          note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true}) //new true..if theres nwe content it will add it to it
        
          res.json(note);
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
        }
    })

// 4.Delete a note
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
        try {
        //    find the note and Delete it
          let note=await Notes.findById(req.params.id)
          if(!note)
          {
             return res.status(404).send("Not Found")
          }
          
          if(note.user.toString()!==req.user.id)
          {
            return res.status(401).send('Not Allowed')
          }

          note=await Notes.findByIdAndDelete(req.params.id) 
          res.json({Success:"Note has been Deleted"});
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Internal Server Error'})
        }
    })


module.exports=router;



