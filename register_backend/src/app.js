const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./db/conn');
const Register = require('./models/registers');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));

hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const registerEmployee = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                confirmpassword: cpassword
            })

            const registered = await registerEmployee.save();
            res.status(201).render('index');
        } else {
            res.send('Password does not match');
        }

    } catch (error) {
        res.status(400).send(error);
    }
});


app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
}); 