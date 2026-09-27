const express = require("express");
const router = express.Router();
const students = require("../data/students");

router.get("/", (req, res, next) => {
  try {
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const student = students.find((s) => s.id === Number(req.params.id));
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { name, email, course, age } = req.body;
    if (!name || !email || !course) {
      return res.status(400).json({ message: "Name, email and course are required" });
    }
    const newStudent = {
      id: students.reduce((max, s) => Math.max(max, s.id), 0) + 1,
      name,
      email,
      course,
      age
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const student = students.find((s) => s.id === Number(req.params.id));
    if (!student) return res.status(404).json({ message: "Student not found" });

    const { name, email, course, age } = req.body;
    if (!name && !email && !course && !age) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    student.name = name ;
    student.email = email ;
    student.course = course ;
    student.age = age ;
    res.status(200).json(student);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const index = students.findIndex((s) => s.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Student not found" });
    const [deleted] = students.splice(index, 1);
    res.status(200).json({ message: "Student deleted", student: deleted });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
