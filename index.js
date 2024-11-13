const express = require('express');
const app = express();
const path = require('path');
const { title } = require('process');

//if want to connent mysql sever 
const mysql = require('mysql');

const sql = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'name_database' });

//set your template engine for display 
app.set('view engine', "ejs");

//set for link in folder 
app.set("views", "views");
app.set(express.static(path.join(__dirname, "public")));

//set a middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//variable for data 
let users = [];

let products = [];

let counter = 1;



//route get
app.get('/', (req, res) => {
    res.send("hello i'm Pongpalin Patipanpipat");
    res.status(200);
});
//res for data type json
app.get('/users', (req, res) => {

    res.status(200);
    res.json(users);
});
app.get('/products', (req, res) => {

    res.status(200);
    res.json(products);
});

//route for unknown URL metods get
app.get('/unknown', (req, res) => {
    res.status(404).json({
        status: 404,
        message: "Not Found - This resource does not exist"
    });
});
// if user not a admin
app.get('/admin', (req, res) => {
    const isAdmin = false; 
    if (!isAdmin) {
        res.status(403).json({
            status: 403,
            message: "Forbidden - Access denied"
        });
    } else {
        res.status(200).json({ message: "Admin access granted" });
    }
});
//route for sever err metods get
app.get('/error', (req, res) => {
    try {
        throw new Error("Simulated server error");
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
});

//for render views ejs
app.get('/home', (req, res) => {
    res.render("home");
    res.status(200);
});

//route post

//if have a user
app.post('/register', (req, res) => {
    const username = req.body.username;
    const userExists = true; 
    if (userExists) {
        res.status(409).json({
            status: 409,
            message: "Conflict - Username already exists"
        });
    } else {
        res.status(201).json({ message: "User registered successfully" });
    }
});

app.post('/user', (req, res) => {
    const user = req.body;
    user.id = counter;
    counter += 1;




    users.push(user);
    res.status(201).json({
        status: "201",
        message: "user create success",
        datauser: user
    });
});
app.post('/product', (req, res) => {
    const product = req.body;
    product.id = counter;
    counter += 1;

    products.push(product);
    res.status(201).json({
        status: "201",
        message: "product create success",
        dataproduct: product
    })
});


//route put 
app.put('/user/:id' ,(req,res)=>{
    let id = req.params.id;
    let updateUser = req.body;

    //search id data for update
    let selectindex = users.findIndex(users => user.id == id);


    users[selectindex].firstname = updateUser.firstname || users[selectindex].firstname;
    users[selectindex].lastname = updateUser.lastname || users[selectindex].lastname;

    res.status(200).json({
        message:"update success",
        data: updateUser,
        indexupdate : update
    });
});
//route patch
app.patch('/product/:id' ,(req,res)=>{
    let id = req.params.id;
    let updateproduct = req.body;

    //search id data for update
    let selectindex = products.findIndex(product => product.id == id);

    if(updateproduct.name){
        products[selectindex].name = updateproduct.name;
    }
    if(updateproduct.price){
        products[selectindex].price = updateproduct.price
    }

   

    res.status(200).json({
        message:"update success",
        data: updateproduct,
        indexupdate : selectindex
    });
});


//route for delete
app.delete("/product/:id",(req,res)=>{
    let id = req.params.id;
    let selectindex = products.findIndex(product => product.id == id);

    products.splice(selectindex,1)

    res.status(204).send();



});
app.delete("/user/:id",(req,res)=>{
    let id = req.params.id;
    let selectindex = users.findIndex(user => user.id == id);

    products.splice(selectindex,1)

    res.status(204).send();



});

app.get('/error', (req, res) => {
    try {
        throw new Error("Simulated server error");
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
});


app.listen(3000, () => {
    console.log('Sever is runing...');
});