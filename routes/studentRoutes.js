const express = require("express");
const router = express.Router();
const db = require("../data/students");
const students = require("../data/students");

router.get("/", (req, res) => {
  res.status(200).json(students);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  res.status(200).json(student);
});

router.post("/", (req, res) => {
  const { name, email, course, age } = req.body;
  if (!name || !email || !course) {
    return res.status(400).json({ message: "Name, email and course are required" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    email,
    age,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }
  const { name, course, email, age } = req.body;
  if (name) student.name = name;
  if (course) student.course = course;
  if (email) student.email = email;
  if (age) student.age = age;

  res.status(200).json(student);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const studentIndex = students.findIndex((s) => s.id === id);
  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }
  students.splice(studentIndex, 1);
  res.status(200).json({ message: "Student deleted" });
});

module.exports = router;