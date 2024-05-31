import React from "react";
import Task from "../Task/Task";

function Tasklist({todoData, onDeleted, onDone, onEditing}) {
  return (
    <ul className="todo-list">
      {todoData.map((e) => {
        return (
          <Task key={e.id}
          e={e}
          onDeleted={onDeleted}
          onDone={() => onDone(e)}
          onEditing={onEditing} />
        )
      })}
    </ul>
  )
}

export default Tasklist;