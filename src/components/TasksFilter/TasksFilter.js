import React from "react";

function TasksFilter({filters}) {
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
  )
}

export default TasksFilter;