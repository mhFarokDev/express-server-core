const express = require('express');
const router = express.Router()
// All Students Controller Funcons
const {getAllData, addNewData, getSingleData, editSingleData, deleteSingleData} = require('../controllers/students.js');

// Routers
router.route('/').get(getAllData).post(addNewData);
router.route('/:id').get(getSingleData).put(editSingleData).patch(editSingleData).delete(deleteSingleData)

module.exports = router;