const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:/gestionnaireDeProjetsAgile').then(
    ()=>{
        console.log('connect');
    }
    ).catch((err)=> console.log(err));

module.exports = mongoose  