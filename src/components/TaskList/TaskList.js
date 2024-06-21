import React from 'react';
import PropTypes from 'prop-types';

import Task from './Task/Task';
import './TaskList.css';

export default function TaskList({ todoData = [], onDeleted, onDone, onEditing }) {
  return (
    <ul className="todo-list">
      {todoData.map((e) => {
        return <Task key={e.id} e={e} onDeleted={onDeleted} onDone={() => onDone(e)} onEditing={onEditing} />;
      })}
    </ul>
  );
}
TaskList.propTypes = {
  todoData: PropTypes.array,
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  onEditing: PropTypes.func,
};
