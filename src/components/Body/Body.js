import React, {useState} from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
// import {format} from 'date-fns';
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

// let count = 0;

function Body()  {
  const [todoData, setTodoData] = useState([
    {class: 'completed', span: 'Completed task', createdTime: 'created 17 seconds ago', id: '11'},
    {class: 'editing', span: 'Editing task', createdTime: '5 minutes ago', id: '12'},
    {class: 'view', span: 'Active task', createdTime: 'created 5 minutes ago', id: '13'}
  ]);
  // const [todo, setTodo] = useState('');
  // const [tasks, setTasks] = useState([]);

  // let arr = tasks;

  // const addTask = (val = '') => {
  //   count++;
  //   const taskTodo = {
  //     class: 'view',
  //     span: val,
  //     createdTime: format(new Date(), "HH:mm:ss"),
  //     id: count
  //   };
  //   arr.unshift(taskTodo);
  //   setTasks(arr)
  //   setTodo('');
  // }
function deleteItem(e) {
  const id = todoData.findIndex(elem => elem.id === e.target.id);
  let newTodo = [...todoData.slice(0, id), ...todoData.slice(id + 1)];
  setTodoData(newTodo);
}
  return (
    <div className="todoapp">
      <NewTaskForm 
        // addTask={addTask} 
        // todo={todo} 
        // setTodo={setTodo} 
      />
      <TaskList 
        todoData={todoData} 
        onDeleted={deleteItem}
        // onChange={handleChange}
        // setTasks={setTasks} 
      />
      <Footer 
        // tasks={tasks} 
        // setTasks={setTasks} 
        // onChange = {() => setTasks(tasks)}
      />
    </div>
  )
}
export default Body;