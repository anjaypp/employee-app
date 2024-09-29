const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB).then(() => {
    console.log('Connection successful',);
})
.catch(() => {
    console.log('Connection failed');
})