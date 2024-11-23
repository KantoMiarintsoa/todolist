import { connectDB } from "../db.js";  
import { ObjectId } from 'mongodb'; 


export const index=async (request,response)=>{
    const db=await connectDB()
    const taskCollection=db.collection("tasks");
    const tasks=await taskCollection.find({}).toArray();
    console.log(tasks)
    response.render('index',{tasks})
}

export function getTasks(request, response) {
    return response.json({ message: "hello world" });
}

async function createTask(request, response) {
    const { nom, description } = request.body;

    if (!nom || description === undefined) {
        return response.status(400).json({ message: "tous les champs sont required" });
    }
    const db = await connectDB();
    const tasks = db.collection("tasks");

    try {
        const nouveauTask = {
            nom,
            description,
            status: "incomplete",
        };
    
        await tasks.insertOne(nouveauTask);
    
        response.status(201).json(nouveauTask);

    } catch (error) {   
        response.status(505).json({ message: "erreur lors de la creation de tasks", error });
    }
}

async function readTask(request, response) {
    const { status, sort } = request.query; 

    const db = await connectDB();
    const taskCollection = db.collection("tasks");

    const filter = {};
    if (status) {
        filter.status = status; 
    }

    const sortOrder = {};
    if (sort === 'asc') {
        sortOrder.nom = 1; 
    } else if (sort === 'desc') {
        sortOrder.nom = -1; 
    }

    try {
        const tasks = await taskCollection
            .find(filter) 
            .sort(sortOrder)
            .toArray();

        console.log(tasks); 

        return response.status(200).json({
            "total":tasks.length,
            "tasks":tasks
        }); 
    } catch (error) {
        response.status(500).json({ message: "Erreur lors du fetch des tâches", error });
    }
}

async function updateTask(request, response) {
    const {id} = request.params
    const { nom, description, completed } = request.body;
    
    if (!nom) {
        return response.status(400).json({ message: "leTask name (nom) is required for update" });
    }

    console.log(id)

    const db = await connectDB();
    const tasksCollection = db.collection("tasks");

    const updateFields = {};
    if (nom !== undefined) updateFields.nom = nom;
    if (description !== undefined) updateFields.description = description;
    if (completed !== undefined) updateFields.completed = completed;

        const updatedTask = await tasksCollection.updateOne(
            { _id: ObjectId.createFromHexString(id)},
            { $set: updateFields }
        );

        if (updatedTask.matchedCount === 0) {
            return response.status(404).json({ message: "Task not found" });
        }

        response.status(200).json({ message: "Task updated successfully" });

    // try {
        
    // } catch (error) {
    //     response.status(500).json({ message: "Error updating task", error });
    // }
}


async function deleteTask(request, response) {
    const { id } = request.params;

    if (!id) {
        return response.status(400).json({ message: "Task ID is required for deletion" });
    }

    const db = await connectDB();
    const tasksCollection = db.collection("tasks");

    try {
        const result = await tasksCollection.deleteOne(
            { _id: ObjectId.createFromHexString(id)  });

        if (result.deletedCount === 0) {
            return response.status(404).json({ message: "not found" });
        }

        response.status(200).json({message:"success"});  
    } catch (error) {
        response.status(500).json({ message: "Error deleting task", error });
    }
}


async function changeStatus(request, response) {
    const { id } = request.params;
    const {status}=request.body

    if (!id) {
        return response.status(400).json({ message: "Tâche non trouvée" });
    }

    try {
        const db = await connectDB();
        const tasksCollection = db.collection("tasks");

        const task = await tasksCollection.findOne({ _id: ObjectId.createFromHexString(id) });

        if (!task) {
            return response.status(404).json({ message: "Tâche introuvable" });
        }

        const newStatus = status

        const result = await tasksCollection.updateOne(
            { _id: ObjectId.createFromHexString(id) },
            { $set: { status: newStatus } }
        );

        if (result.modifiedCount === 0) {
            return response.status(400).json({ message: "Impossible de mettre à jour la tâche" });
        }

        response.status(200).json({ message: `Statut de la tâche mis à jour en '${newStatus}'` });
    } catch (error) {
        response.status(500).json({ message: "Erreur lors de la mise à jour du statut de la tâche", error });
    }
}
export { createTask, readTask ,updateTask,deleteTask,changeStatus};

