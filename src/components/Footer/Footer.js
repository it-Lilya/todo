import React from "react";
import TasksFilter from "../TasksFilter/TasksFilter";

function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">0 items left</span>
      <TasksFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}

export default Footer;