import React from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

export default function TasksFilter({ filters }) {
  return (
    <ul className="filters" onClick={(e) => filters(e.target)}>
      <li>
        <button className="selected">All</button>
      </li>
      <li>
        <button>Active</button>
      </li>
      <li>
        <button>Completed</button>
      </li>
    </ul>
  );
}

TasksFilter.propTypes = {
  filters: PropTypes.func,
};
