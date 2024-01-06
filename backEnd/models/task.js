const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema= new Schema({
 startTime:{
   type:Date,
 },
 endTime:{
  type:Date,
},
priority :{
  type:String,
  enum: ['Low', 'Medium', 'High'], 

},
status:{
  type:String,
  enum: ['Pending','To Do','in Progress', 'Completed', 'Tested', 'Done'], 

},
description:{
  type:String,
}
})
const task = mongoose.model('task', TaskSchema);
module.exports = task


