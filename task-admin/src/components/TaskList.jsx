import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, fetchTasks, updateTask } from '../features/tasks/taskSlice';

function TaskList() {

    const [title,setTitle]=useState("");
    const dispatch=useDispatch();
    const {item:tasks,loading,error}=useSelector((state)=>state.tasks)
    useEffect(() => {
        dispatch(fetchTasks()).then((res) => {
          console.log('Fetched Tasks:', res.payload); // ✅ Log tasks after fetching
        });
      }, [dispatch]);
  const handleAdd = () => {
    if (title.trim()) {
      dispatch(addTask({ title, completed: false }));
      setTitle('');
    }
  };

  const toggleTask = (task) => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };
    return (
        <div>
        <h2>Task Manager</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={handleAdd}>Add Task</button>
  
        {loading && <p>Loading tasks...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
  
        <ul>
          {tasks?.map((task) => (
            <li key={task._id}>
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
              <button onClick={() => toggleTask(task)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() =>
                 dispatch(deleteTask(task._id))}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
export default TaskList
