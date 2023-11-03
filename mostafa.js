const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/taskDB').then(() =>{
    console.log("Connected to mongoose!");
})



app.get('/', (req,res) => {
    res.send('Server working')
})

const studentSchema = mongoose.Schema({

    user: {
        type:String,
        required:true
    },
    password: {
        type:Number,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    bio: {
        type:String,
        required:true
    }


})

const  Student = mongoose.model('Student',studentSchema)


const courseSchema = mongoose.Schema({

    name: {
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    }


})

const  Course = mongoose.model('Course',courseSchema)


// Documents

const Studentarr = [

    {
        user:"mohsen",
        password:12,
        age:50,
        address:"sodan",
        bio:"IS Student"
    },
    {
        user:"darsh",
        password:45,
        age:60,
        address:"monfia",
        bio:"iS Student"
    },
    {
        user:"joo",
        password:29,
        age:19,
        address:"giza",
        bio:"ij Student"
    }

]

const Coursesarr = [

    {
        name:"fbi Course",
        location:"libya",
        description:"Course for FCI students"

    },
    {
        name:"udimy",
        location:"usa",
        description:"learn"

    }

]


//Inserting documents

const insertDocs = async () => {

    await Student.deleteMany()
    await Course.deleteMany()

    await Student.insertMany(Studentarr)
    await Course.insertMany(Coursesarr)

}

insertDocs();

//Student endpoint

app.get('/students', async (req,res) => {
    const students = await Student.find()
    res.send(students)
})

//Courses endpoint

app.get('/courses', async (req,res) => {
    const courses = await Course.find()
    res.send(courses)
})








app.listen(3000, () => {
    console.log("Server on!")
})