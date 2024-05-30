import React from "react";
import Task from "../Task/Task";

function Tasklist({todoData, onDeleted}) {
  return (
    <ul className="todo-list">
      <Task 
      todoData={todoData} 
      onDeleted={onDeleted}
      />
    </ul>
  )
}

export default Tasklist;