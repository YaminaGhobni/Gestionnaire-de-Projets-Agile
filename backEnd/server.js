require('./config/connect'); 
const express = require('express');
const app = express() 
app.use(express.json()); 
const tachesRoute = require('./routes/task');
//const userRoute = require('./routes/user');
app.use('/api/task', tachesRoute)
//app.use('/api/user', userRoute)
app.listen( 3000, ()=>{ 
    console.log ('sever work');
})


