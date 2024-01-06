const express = require('express');
const router = express.Router(); 
const TaskModel = require('../models/task');

// Create new Task
router.post('/create', async (req, res) => {   
  try {
    const data = req.body;  
    const newTask = new TaskModel(data);
    const savedTask = await newTask.save();   
    console.log('Create work');
    res.status(200).send(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);

    res.status(400).send({ error: 'Failed to create task' });
  }
});


//get all tasks 
router.get('/all', async (req, res)=>{  
  try{ 
    const taskes  = await TaskModel.find();
    console.log('worked');
    res.status(200).send(taskes);
  } catch(error){
    console.log(error);
     res.status(400).send(error)
  }
  })

//delete task by id
router.delete('/delete/:id', (req, res)=>{ 
  id = req.params.id
  TaskModel.findOneAndDelete({_id:id})
  .then((deletedTask)=>{
       res.status(200).send(deletedTask);
      })
      .catch(
          (error)=>{
            console.log(error);
            res.status(400).send(error)
          }
      )
})

router.put('/update/:id', (req, res)=>{
  id = req.params.id;   
  newData = req.body;  
  TaskModel.findByIdAndUpdate({_id: id}, newData)   
  .then(
      (updatedTask)=>{
        res.status(200).send(updatedTask);
      }
  )
  .catch((error)=> {
       console.log(error);
        res.status(400).send(error)
  }
  )
})

module.exports = router;
