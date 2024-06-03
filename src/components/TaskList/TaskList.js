import React from "react";
import Task from "./Task/Task";
import PropTypes from 'prop-types';

export default function Tasklist({todoData = [], onDeleted, onDone, onEditing}) {
  return (
    <ul className="todo-list">
      {todoData.map((e) => {
        return (
          <Task key={e.id}
            e = {e}
            onDeleted = {onDeleted}
            onDone={() => onDone(e)}
            onEditing = {onEditing} />
        )
      })}
    </ul>
  )
}
Tasklist.propTypes = {
  todoData: PropTypes.array,
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  onEditing: PropTypes.func,
}