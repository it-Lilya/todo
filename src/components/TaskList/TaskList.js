import React from "react";
import Task from "../Task/Task";

function Tasklist({setTasks}) {
  const todoData = [
    {class: 'completed', span: 'Completed task', createdTime: 'created 17 seconds ago', id: '11'},
    {class: 'editing', span: 'Editing task', createdTime: '5 minutes ago', id: '12'},
    {class: 'view', span: 'Active task', createdTime: 'created 5 minutes ago', id: '13'}
  ];
  return (
    <ul className="todo-list" onChange={() => setTasks()}>
      <Task todoData={todoData} />
    </ul>
  )
}

export default Tasklist;