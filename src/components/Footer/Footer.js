import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter/TasksFilter';

export default function Footer({ done = 0, filters, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{done} items left</span>
      <TasksFilter filters={filters} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.protoTypes = {
  done: PropTypes.number,
  filters: PropTypes.func,
  clearCompleted: PropTypes.func,
};
