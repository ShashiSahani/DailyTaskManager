import React from 'react'
import TaskList from '../components/TaskList'

function AdminPanel() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🛠 Admin Task Panel</h1>
      <TaskList/>
    </div>
  )
}

export default AdminPanel
