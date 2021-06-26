const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student')

router.get('/', async (req, res, next) => {
  try {
  let allTests = await Test.findAll()
  res.status(200).send(allTests);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
try {
  let singleTest = await Test.findByPk(req.params.id);
  res.status(200).send(singleTest)
} catch(error) {
  next(error)
}
})

router.post('/student/:studentId', async (req, res, next) => {
  try {
  const studentId = req.params.studentId;
  const studentInst = await Student.findByPk(studentId);
  const newTest = await Test.create(req.body);

  await newTest.setStudent(studentInst)
  res.status(201).send(newTest)
  } catch(error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    let test = await Test.findByPk(req.params.id);
    await test.destroy()
    res.status(204).send('File deleted');
  } catch(error) {
    next(error)
  }
})
// router.delete('/:id', async (req, res, next) => {
//   try {
//     let id = req.params.id;
//     await Test.destroy({where: {id: id}})
//     res.status(204).send('Test has been deleted')
//   } catch(error) {
//     next(error);
//   }
// })

module.exports = router;
