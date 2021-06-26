const router = require('express').Router();
const Student = require('../db/models/student')

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll()
    res.send(students);
  } catch(error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
  let student = await Student.findByPk(req.params.id)
  if (student) {
  res.send(student)
  } else {
    res.status(404).send('Student not found');
  }
  } catch(error) {
  next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // create a new Student instance
    let student = await Student.create(req.body)
    res.status(201).send(student);
  } catch(error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    // update instance
    let student = await Student.findByPk(req.params.id)
    let updatedStudent = await student.update(req.body)
    res.status(200).send(updatedStudent);
  } catch(error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let student = await Student.findByPk(req.params.id)
    let deletedStudent = await student.destroy(req.body);
    res.status(204).send(deletedStudent)
  } catch(error) {
    next(error)
  }
})

module.exports = router;
