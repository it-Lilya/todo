import React from "react";
import TasksFilter from "../TasksFilter/TasksFilter";

function Footer({done, filters, clearCompleted}) {
  return (
    <footer className="footer">
      <span className="todo-count">{done} items left</span>
      <TasksFilter filters={filters} />
      <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  )
}

export default Footer;