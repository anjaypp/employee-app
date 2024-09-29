const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    EmployeeName:String,
    EmployeeDesignation:String,
    EmployeeLocation:String,
    Salary:Number,
}, { versionKey: false });

const employeeData = mongoose.model('employee',employeeSchema);
module.exports = employeeData;