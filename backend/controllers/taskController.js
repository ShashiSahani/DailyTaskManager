import { Task } from "../models/taskModel.js";

export const getTasks=async (req,res)=>{

  try {
    const {completed}=req.query;

    let filter={};
    if(completed==='true'){
        filter.completed=true;
    }else if(filter.completed==='false'){
        filter.completed=false;

    }
    const tasks=await Task.find(filter);
     res.status(200).json(tasks);
  } catch (error) {
    next(error)
  }
};

export const createTask = async (req, res, next) => {
    try {
      const { title, completed } = req.body;
      const task = await Task.create({ title, completed });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };
  

export const updateTask=async(req,res)=>{
    const task=await Task.findByIdAndUpdate(req.params.id,req.body,
        {new:true});
    res.json(task)
}


export const deleteTask=async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id);
    res.json({message:"Task delete"});
}