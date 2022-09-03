// export file system module
const fs = require('fs');

// export path module
const path = require('path');
const generateID = require('../../uitility/generateId');

// all student data read by fs and data type string and objsct
const students = fs.readFileSync(path.join(__dirname, '../data/students.json'));
const students_obj = JSON.parse(students)


// All Students data return
const getAllData = (req, res) =>{
    res.status(200).json(students_obj) 
}

//  Single student data return
const getSingleData = (req, res) =>{
    const id = req.params.id;
    if (students_obj.some(data => data.id == id)) {
        res.status(200).json(students_obj.find(data => data.id == id)) 
    } else {
        res.status(404).json({message : 'data not found!'})
    }
}

// New Student data add
const addNewData = (req, res) =>{
        let genId = generateID(students_obj)
        const {name, age, skill} = req.body;
    if (name != '' && age != '' && skill != '') {
        
        students_obj.push({
            id : genId,
            name : name,
            age : age,
            skill : skill
        })
        fs.writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(students_obj))
        res.status(201).json({message : 'data added successfull.'})
    } else {
        res.status(400).json({message : 'Worng Data!'})
    }

}

// Edit student data
const editSingleData = (req, res) =>{
    const id = req.params.id;
    if (students_obj.some(data => data.id == id)) {
        const {name, age, skill} = req.body;
        const index = students_obj.findIndex(data => data.id == id)
        students_obj[index] = {
            id : Number(id),
            name : name,
            age : age,
            skill : skill
        }
        fs.writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(students_obj))
        res.status(202).json({message : 'data edit successfull'}) 
    } else {
        res.status(404).json({message : 'data not found!'})
    } 
}

// Delete student data
const deleteSingleData = (req, res) =>{
    const id = req.params.id;
    if (students_obj.some(data => data.id == id)) {
        const updateData = students_obj.filter(data => data.id != id)
        fs.writeFileSync(path.join(__dirname, '../data/students.json'), JSON.stringify(updateData))
        res.status(202).json({message : 'data deleted successfull'}) 
    } else {
        res.status(404).json({message : 'data not found!'})
    }  
}

module.exports = {getAllData, addNewData, getSingleData, editSingleData, deleteSingleData};