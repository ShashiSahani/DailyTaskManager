import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../features/tasks/taskSlice';
import ToggleSwitch from '../comman/ToggleSwitch';
import DataTable from '../comman/DataTable';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const columns = [
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'completed',
      header: 'Status',
      cell: ({ row }) => (
        <ToggleSwitch
          checked={row.original.completed}
          id={row.original._id}
          endpoint="https://dailytaskmanager-zi3k.onrender.com/api/v1/tasks"
          onUpdate={(updated) => console.log('Updated:', updated)}
        />
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDelete(row.original._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Task Admin Panel</h1>
      <DataTable columns={columns} data={tasks} />
    </div>
  );
};

export default TaskList;
