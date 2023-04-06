import express from "express";
import { addNewStudents, deleteStudent, getAllStudents, getSingleStudent, updateStudents } from "../controller/studentController.js";
const router = express.Router();
router.route('/').get(getAllStudents).post(addNewStudents)
router.route('/:id').get(getSingleStudent).put(updateStudents).patch(updateStudents).delete(deleteStudent)


export default router;