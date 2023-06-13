const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let tasks = [
    {id: 1, title: "Call Client", description: "Schedule a phone call with the client to discuss project updates", done: false, due: new Date("2023-06-15")},
    {id: 2, title: "Send Meeting Agenda", description: "Email the meeting agenda to all participants before the scheduled team meeting.", done: false, due: new Date("2023-06-17")},
    {id: 3, title: "Update Sales Spreadsheet", description: "Enter the latest sales data into the spreadsheet and calculate total revenue.", done: false, due: new Date("2023-06-20")},
    {id: 4, title: "Review Website Content", description: "Proofread and review the content on the company's website for any errors or outdated information.", done: false, due: new Date("2023-06-22")},
    {id: 5, title: "Purchase Office Supplies", description: "Place an order for necessary office supplies like stationery and printer ink.", done: false, due: new Date("2023-06-25")}
]





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
