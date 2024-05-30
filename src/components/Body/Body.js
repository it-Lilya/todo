import React, {useState} from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import {format} from 'date-fns';
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

let count = 0;

function Body()  {
  const [todo, setTodo] = useState('');
  const [tasks, setTasks] = useState([]);

  let arr = tasks;

  const addTask = (val = '') => {
    count++;
    const taskTodo = {
      class: 'view',
      span: val,
      createdTime: format(new Date(), "HH:mm:ss"),
      id: count
    };
    arr.unshift(taskTodo);
    setTasks(arr)
    setTodo('');
  }
  return (
    <div className="todoapp">
      <NewTaskForm addTask={addTask} todo={todo} setTodo={setTodo} />
      <TaskList tasks={tasks} setTasks={setTasks} />
      <Footer tasks={tasks} setTasks={setTasks} onChange = {() => setTasks(tasks)}/>
    </div>
  )
}
export default Body;