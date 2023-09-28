const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3001;
const db = require('./models');
const { User, Todo, Driver } = require('./models');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/users', (req, res) => {
    User.findAll().then(data => {
        res.status(200).send(data);
    }).catch(e=>console.log(e));
});

app.post('/api/users/create', (req, res) => {
    const { name, role, login, password } = req.body;
    User.findOrCreate({
        where: { login },
        defaults: { name, role, password }
    }).then((data)=>{
        if(data[1])
            res.status(200).send('Created new user!')
        res.sendStatus(500)
    }).catch(e=>console.log(e))
})

app.delete('/api/users/delete/:id', (req, res)=>{
    const { id } = req.params;
    User.destroy({
        where: { id }
    }).then((data)=>{
        if(data)
            res.status(200).send('Deleted!')
        res.sendStatus(404)
    }).catch(e=>console.log(e))
})

app.get('/api/drivers', (req, res)=>{
    Driver.findAll().then((data)=>{
        res.status(200).send(data);
    }).catch(e=>console.log(e));
})

app.post('/api/drivers/create', (req, res)=>{
    const { name } = req.body;
    Driver.findOrCreate({
        where: { name },
        defaults: { name }
    }).then((data)=>{
        if(data[1])
            res.status(200).send('Create driver!');
        res.sendStatus(500);
    }).catch(e=>console.log(e))
})

app.delete('/api/drivers/delete/:id', (req, res)=>{
    const { id } = req.params;
    Driver.destroy({
        where: { id }
    }).then(data=>{
        if(data)
            res.status(200).send('Deleted!')
        res.sendStatus(404);
    }).catch(e=>console.log(e))
})

app.get('/api/todos', (req, res)=>{
    Todo.findAll().then(data=>{
        res.status(200).send(data);
    }).catch(e=>console.log(e));
})

app.post('/api/todos/create', (req, res) => {
    const { todo, adress, dateStart, dateEnd, description, allDay, driver_id, user_id } = req.body;
    Todo.create({ todo, adress, dateStart, dateEnd, description, allDay, driver_id, user_id })
    .then((data)=>{
        if(data[1])
            res.status(200).send('Created new todos!')
        res.sendStatus(500)
    }).catch(e=>console.log(e))
})

app.delete('/api/todos/delete/:id', (req, res)=>{
    const { id } = req.params;
    Todo.destroy({
        where: { id }
    }).then((data)=>{
        if(data)
            res.status(200).send('Deleted!')
        res.sendStatus(404)
    }).catch(e=>console.log(e))
})

db.sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server running on port: ${port}`);
    });
}).catch((e)=>console.log(e));