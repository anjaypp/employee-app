const express = require('express');
const router = express.Router();
const employeeModel = require('../model/employeeData');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(__dirname + '/public'));


// GET Operation - Display Employees
router.get('/', async (req, res) => {
  try {
    // Fetch employees from the database
    const employees = await employeeModel.find();
    res.render('home', {
      title: 'Employee Management System',
      employee: employees 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// GET Operation - Display Employee
router.get('/add', (req, res) => {
  res.render('addEmployee');
})

// POST: Add a new employee
router.post('/add', async (req, res) => {
  try {
      const emp = new employeeModel(req.body);
      await emp.save();
      res.redirect('/');
  } catch (err) {
      console.error(err);
      res.status(500).send("Error adding employee");
  }
});

// GET: Render edit employee page
router.get('/edit/:id', async (req, res) => {
  try {
      const emp = await employeeModel.findById(req.params.id);
      if (!emp) return res.status(404).send("Employee not found");
      res.render('edit', { emp });
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
});

// POST: Update employee details (can switch to PUT if you prefer)
router.post('/edit/:id', async (req, res) => {
  try {
      const empUpdate = req.body;
      const updatedEmp = await employeeModel.findByIdAndUpdate(req.params.id, empUpdate, { new: true });
      if (!updatedEmp) return res.status(404).send("Employee not found");
      res.redirect('/');
  } catch (err) {
      console.error(err);
      res.status(500).send("Error updating employee");
  }
});

// POST: Delete an employee (can switch to DELETE if you prefer)
router.post('/delete/:id', async (req, res) => {
  try {
      const deletedEmp = await employeeModel.findByIdAndDelete(req.params.id);
      if (!deletedEmp) return res.status(404).send("Employee not found");
      res.redirect('/');
  } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting employee");
  }
});

module.exports = router;
