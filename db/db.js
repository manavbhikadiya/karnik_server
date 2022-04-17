const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/karnik_db')
.then(()=>{
    console.log('database connection successfull');
})
.catch((e)=>{
    console.log(e);
})