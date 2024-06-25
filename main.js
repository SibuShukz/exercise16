const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const Employee = require("./models/employee")


conn = mongoose.connect('mongodb://127.0.0.1:27017/company');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
})

const getRandom = (arr)=>{
    let rno = Math.floor(Math.random() * (arr.length - 1))
    return arr[rno]
}


app.get('/generate', async(req, res) => {
        // Clear the collection Employee
        await Employee.deleteMany({}) 
    //generate randon data
    let randomNames = ['Rohan', "Sohan", "Mohan", "Sobhan"]
    let randomLang = ["Python", "js", "C++", "Java"]
    let randomCities = ["Bilaspur", "Moradabad", "Mysore", "Kolkata"]

   for (let index = 0; index < 10; index++) {
        let e = await Employee.create({
            name: getRandom(randomNames),
            salary: Math.floor(Math.random() * 22000),
            language: getRandom(randomLang),
            city: getRandom(randomCities),
            isManager: (Math.random()>0.5)?true:false
        })
        console.log(e)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})