const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let tasks = [
    {id: 1, title: "Call Client", description: "Schedule a phone call with the client to discuss project updates", done: false, dueDate: new Date("2023-06-15").toLocaleDateString("de-CH")},
    {id: 2, title: "Send Meeting Agenda", description: "Email the meeting agenda to all participants before the scheduled team meeting.", done: false, dueDate: new Date("2023-06-17").toLocaleDateString("de-CH")},
    {id: 3, title: "Update Sales Spreadsheet", description: "Enter the latest sales data into the spreadsheet and calculate total revenue.", done: false, dueDate: new Date("2023-06-20").toLocaleDateString("de-CH")},
    {id: 4, title: "Review Website Content", description: "Proofread and review the content on the company's website for any errors or outdated information.", done: false, dueDate: new Date("2023-06-22").toLocaleDateString("de-CH")},
    {id: 5, title: "Purchase Office Supplies", description: "Place an order for necessary office supplies like stationery and printer ink.", done: false, dueDate: new Date("2023-06-25").toLocaleDateString("de-CH")}
]

app.get('/tasks', (req, res) => {
    res.json(tasks).status(200)
});

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => task.id === parseInt(id));

    if (task) {
        return res.json(task).status(200);
    } else {
        return res.status(404).send("Task not found.");
    }
});

app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        done: false,
        due: req.body.due
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex !== -1) {
        tasks[taskIndex] = {...tasks[taskIndex], ...req.body };
        res.json(tasks[taskIndex]).status(201);
    } else {
        res.status(404).send("Task not found");
    }
});

app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));

    if (taskIndex !== -1){
        const deletedTask = tasks.splice(taskIndex, 1);
        res.json(deletedTask[0]).status(204);
    } else {
        res.status(404).send("Task not found.")
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
