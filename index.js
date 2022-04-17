const express = require('express');
const app= express();
const db = require('./db/db');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const PORT  = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.use('/user',userRoute);

app.listen(PORT,()=>{
    console.log(`Listening to the PORT ${PORT}`);
})