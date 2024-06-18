import React from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

export default function TasksFilter({ filters }) {
  return (
    <ul className="filters" onClick={(e) => filters(e.target)}>
      <li>
        <button className="view selected">All</button>
      </li>
      <li>
        <button className="view">Active</button>
      </li>
      <li>
        <button className="completed">Completed</button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  filters: PropTypes.func,
};
