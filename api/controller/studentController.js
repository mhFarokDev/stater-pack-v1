import Students from "../models/studentModel.js";
import errorController from "./errorController.js";
import bcrypt from "bcrypt";
/**
 * 
 * @access public
 * @route api/student
 * @method GET 
 * 
 */
export const getAllStudents = async (req, res, next) =>{
    try {
        const students = await Students.find()
        if (!students) {
            return next(errorController(402, "students missing"))
        }
        res.status(200).json(students)
    } catch (error) {
        next(error)
    }
}

/**
 * 
 * @access public
 * @route api/student/:id
 * @method GET 
 * 
 */
export const getSingleStudent = async (req, res, next) =>{
    const stdId = req.params.id
    try {
        const student = await Students.findById(stdId)
        if (!student) {
            return next(errorController(401, "Usere not found!"))
        }
        res.status(200).json(student)
    } catch (error) {
        next(error)
    }
}


/**
 * 
 * @access public
 * @route api/student/:id
 * @method POST 
 * 
 */

export const addNewStudents = async (req, res, next) =>{
    try {
        const saltPass = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, saltPass)
        const addedStudent = await Students.create({...req.body, password})
        if (!addedStudent) {
            return next(errorController(402, "Worng Information....."))
        }
        res.status(200).json(addedStudent)
    } catch (error) {
        next(error)
    }
}


// update all students
/**
 * 
 * @access public 
 * @route api/student/:id
 * @method PUT/PATCH 
 */
export const updateStudents = async (req, res, next) =>{
    const id = req.params.id;
    try {
        const studentData = await Students.findById(id)
        if (!studentData) {
            return next(errorController(401, "worng user!"))
        }
        const password = studentData.password;
        const updateData = await Students.findByIdAndUpdate(id, {studentData, ...req.body, password},{new : true})
        res.status(200).json(updateData)
    } catch (error) {
        next(error)
    }
}


// delete student
/**
 * 
 * @access public 
 * @route api/student/:id
 * @method DELETE
 * @returns 
 */
export const deleteStudent = async (req, res, next) =>{
    const id = req.params.id;
    try {
        const studentData = await Students.findById(id)
        if (!studentData) {
            return next(errorController(401, "worng user!"))
        }
        const deleteStudent = await Students.findByIdAndDelete(id);
        res.status(200).json(deleteStudent)
    } catch (error) {
        next(error)
    }
}