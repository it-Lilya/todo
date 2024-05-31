import React, { useEffect, useState } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import { format } from "date-fns";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";

let id = 0;
let newArr = [];

function Body() {
  const [todoData, setTodoData] = useState([
    createItem("completed", "Completed task", 'created 1 second ago'),
    createItem("editing", "Editing task", 'created 1 second ago'),
    createItem("view", "Active task", 'created 1 second ago')
  ]);
  const [done, setDone] = useState(1);
  let count = 0;
  const [copyTodo, setCopyTodo] = useState(todoData);
  const [timers, setTimers] = useState(0);
  let t = Date.now(format(new Date(), "HH:mm:ss"))
  

  function createItem(classItem, text) {
    id++;
    return {
      class: classItem,
      span: text,
      time: 'created 1 second ago',
      id: id,
      timeMs: Date.now(format(new Date(), "HH:mm:ss"))
    };
  }

  function deleteItem(e) {
    const id = todoData.findIndex((elem) => elem.id === +e.target.id);
    let newTodo = [...todoData.slice(0, id), ...todoData.slice(id + 1)];
    setTodoData(newTodo);
    if (todoData.find((er) => er.id === +e.target.id).class !== "completed") {
      count = done - 1;
      setDone(count);
    }
    setCopyTodo(newTodo);
  }

  function onDone(e) {
    if (e.class === "completed") {
      count = done + 1;
      e.class = "view";
    } else if (e.class === "view") {
      count = done - 1;
      e.class = "completed";
    }
    setDone(count);
  }

  function addItem(classItem, text) {
    const newItem = createItem(classItem, text);
    newArr = [newItem, ...todoData];
    count = done + 1;
    setTodoData(newArr);
    setDone(count);
    setCopyTodo(newArr);
  }

  function onEditing(e, btn) {
    e.class = "editing";
    let indx = todoData.findIndex((s) => s.id === e.id);
    let newArray = [...todoData.slice(0, indx), e, ...todoData.slice(indx + 1)];
    setTodoData(newArray);

    const newForm = document.createElement("form");
    const newInpText = document.createElement("input");
    newInpText.className = "edit";
    newInpText.type = "text";
    newInpText.defaultValue = "";
    newForm.appendChild(newInpText);
    btn.closest("li").appendChild(newForm);

    newInpText.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target.value.trim()) {
        event.preventDefault();
        btn.closest("li").querySelector(".description").textContent = event.target.value.trim();
        e.class = "view";
        e.span = event.target.value.trim();
        newArray = [...todoData.slice(0, indx), e, ...todoData.slice(indx + 1)];
        setTodoData(newArray);
        btn.closest("li").removeChild(newForm);
      }
    });
  }

  function filters(e) {
    let newArray = [];
    const btns = document.querySelector('.filters').querySelectorAll('button');
    btns.forEach(btn => btn.classList.remove('selected'));
    e.classList.add('selected');

    if (e.textContent === 'Completed') {
      copyTodo.forEach(r => {
        if (r.class === 'completed') {
          newArray.push(r);
        }
      })
      setTodoData(newArray);
      newArray = [];
    } else if (e.textContent === 'Active') {
      copyTodo.forEach(r => {
        if (r.class === 'view') {
          newArray.push(r);
        }
      })
      setTodoData(newArray);
      newArray = [];
    } else {
      setTodoData(copyTodo);
    }
  }
  
  function clearCompleted() {
    setTodoData([]);
    setCopyTodo([]);
    setDone(0);
  }

  function timerss() {
    let newTodo = todoData;
    newTodo.forEach(t => {
      let difference = Date.now(format(new Date(), "HH:mm:ss")) - t.timeMs;
      if (difference < 60000) {
        t.time = `created ${Math.ceil(difference / 1000)} second ago`;
      } else if (difference >= 60000 && difference <= 3200000) {
        t.time = `created ${Math.ceil(difference / 100000)} minute ago`;
      } else {
        t.time = `created ${Math.ceil(difference / 10000)} hour ago`;
      }
    })
    setTimers(timers+ 1);
  }
  useEffect(() => {
    setCopyTodo(todoData);
  }, [timers])
  setInterval(() => {
    timerss();
  }, 10000)
  

  return (
    <div className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        todoData={todoData}
        onDeleted={deleteItem}
        onDone={onDone}
        onEditing={onEditing}
      />
      <Footer done={done} filters={filters} clearCompleted={clearCompleted} />
    </div>
  );
}
export default Body;
