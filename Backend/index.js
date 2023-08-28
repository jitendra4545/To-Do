


const express = require('express')
const { connection } = require('./config/db')
const { TodoModel } = require('./model/Todo.Model')
const app = express()
require('dotenv').config()
app.use(express.json())

app.get("/tasks", async (req, res) => {
    try {

        let alldata = await TodoModel.find()
        res.send(alldata)
    } catch (err) {
        res.send({ "msg": "Unable to add Data ", "err": err.message })
    }
})

app.post(`/tasks`, async (req, res) => {
    let data = req.body
    console.log(data)
    try {
        let newdata = new TodoModel(data)
        await newdata.save()
        res.send({ "msg": "data added successfully" })
    } catch (err) {
        res.send({ "msg": "Unable to add Data ", "err": err.message })
    }
})


app.delete("/tasks/:id", async (req, res) => {
    let id = req.params.id
    console.log(id)
    try {
        let updateData = TodoModel.deleteOne({ "_id": id })
        res.send({ "msg": "data deleted successfully" })
    } catch (err) {
        res.send({ "msg": "Unable to delete Data ", "err": err.message })
    }
})

app.put("/tasks/:id", async (req, res) => {
    let id = req.params.id
    let data = req.body
    console.log(id, data)
    try {
        const updateData = await TodoModel.updateOne({ "_id": id }, data, { new: true })
        res.send({ "msg": "data Updated successfully" })
    } catch (err) {
        res.send({ "msg": "Unable to delete Data ", "err": err.message })
    }
})
// 6371323361

// app.patch("/tasks/status/:id", async (req, res) => {
//     let id = req.params.id
//     let data = req.body
//     try {
//         const updateData = await TodoModel.updateOne({ "_id": id },data, { new: true })
//         res.send(updateData)
//     } catch (err) {
//         res.send(err.message)
//     }
// })


// { new: true }
app.listen(process.env.port, async () => {
    try {
        await connection
        console.log('connected to db')
    } catch (err) {
        console.log("connection failed")
    }
    console.log(`server running on port ${process.env.port}`)
})