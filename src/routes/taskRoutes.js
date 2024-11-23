import { Router } from "express";
import { createTask, getTasks, readTask ,updateTask,deleteTask, index, changeStatus} from "../controllers/taskController.js";

const router=Router()


// router.get("/list",getTasks)
router.get("/", index)
router.post("/create",createTask)
router.get("/list",readTask)
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);
router.put('/editStatus/:id',changeStatus)
export default router