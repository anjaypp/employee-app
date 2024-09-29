const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
app.use(morgan('dev'));
const employeeRoutes = require("./routes/employeeRoutes");
app.use('/employee',employeeRoutes);
app.set('view engine','ejs');
console.log(__dirname);
app.set('views',__dirname+'/views');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
const port = process.env.PORT;
require("./db/connection");




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
