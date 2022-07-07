const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/', (req, res)=>{
    res.send('Hello!!');
});
// import employee routes
const employeeRoutes = require('./src/routes/employee.route');
const userOrderingRoutes = require('./src/routes/ordering.route');

// create employee routes
app.use('/api/v1/employee', employeeRoutes);

// create userOrdering routes
app.use('/api/v1/userOrdering', userOrderingRoutes);
// update user ordering
app.use('/api/v1/userOrdering/:id', userOrderingRoutes);

// listen to the port
app.listen(port, ()=>{
    console.log(`Express is running at port ${port}`);
});