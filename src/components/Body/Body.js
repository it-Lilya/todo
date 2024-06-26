import React, { useEffect, useState } from 'react';
import './Body.css';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

let id = 0;
let newArr = [];

export default function Body() {
  const [todoData, setTodoData] = useState([]);
  const [done, setDone] = useState(0);
  const [copyTodo, setCopyTodo] = useState(todoData);
  let count = 0;

  function createItem(classItem, text) {
    id++;
    return {
      class: classItem,
      span: text,
      time: 'created 1 second ago',
      id: id,
      timeMs: Date.now(new Date(), 'mm:ss'),
      timer: '00:00',
      flag: false,
      label: false,
      distance: 0,
    };
  }

  function deleteItem(e) {
    const id = todoData.findIndex((elem) => elem.id === +e.target.id);
    let newTodo = [...todoData.slice(0, id), ...todoData.slice(id + 1)];
    setTodoData(newTodo);
    if (todoData.find((er) => er.id === +e.target.id).class !== 'completed') {
      count = done - 1;
      setDone(count);
    }
    setCopyTodo(newTodo);
  }

  function onDone(e) {
    if (e.class === 'completed') {
      count = done + 1;
      e.class = 'view';
      e.label = false;
    } else if (e.class === 'view') {
      count = done - 1;
      e.class = 'completed';
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
    if (e.class !== 'completed') {
      e.class = 'editing';
      let indx = todoData.findIndex((s) => s.id === e.id);
      let newArray = [...todoData.slice(0, indx), e, ...todoData.slice(indx + 1)];
      setTodoData(newArray);
      const newForm = document.createElement('form');
      newForm.className = 'form-edit';
      const newInpText = document.createElement('input');
      newInpText.className = 'edit';
      newInpText.type = 'text';
      newInpText.defaultValue = e.span;
      newForm.appendChild(newInpText);
      btn.closest('li').appendChild(newForm);
      newInpText.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && event.target.value.trim()) {
          event.preventDefault();
          btn.closest('li').querySelector('.title').textContent = event.target.value.trim();
          e.class = 'view';
          e.span = event.target.value.trim();
          newArray = [...todoData.slice(0, indx), e, ...todoData.slice(indx + 1)];
          setTodoData(newArray);
          btn.closest('li').removeChild(newForm);
        }
      });
    }
  }

  function filters(e) {
    let newArray = [];
    const formEdit = document.querySelector('.form-edit');
    if (formEdit) {
      copyTodo.forEach((t) => {
        if (t.id === +formEdit.parentElement.id) {
          t.class = 'view';
          newArr = [...todoData.slice(0, t.id - 1), t, ...todoData.slice(t.id)];
        }
      });
    }
    const btns = document.querySelector('.filters').querySelectorAll('button');
    btns.forEach((btn) => btn.classList.remove('selected'));
    e.classList.add('selected');
    if (e.textContent === 'Completed') {
      copyTodo.forEach((r) => {
        if (r.class === 'completed') {
          newArray.push(r);
        }
      });
      setTodoData(newArray);
      newArray = [];
    } else if (e.textContent === 'Active') {
      copyTodo.forEach((r) => {
        if (r.class === 'view') {
          newArray.push(r);
        }
      });
      setTodoData(newArray);
      newArray = [];
    } else {
      setTodoData(copyTodo);
    }
  }
  function clearCompleted() {
    setTodoData(todoData.filter((e) => e.class !== 'completed'));
    setCopyTodo(copyTodo.filter((e) => e.class !== 'completed'));
  }
  useEffect(() => {
    setDone(todoData.filter((d) => d.class === 'view').length);
  }, []);
  return (
    <div className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList todoData={todoData} onDeleted={deleteItem} onDone={onDone} onEditing={onEditing} />
      <Footer done={done} filters={filters} clearCompleted={clearCompleted} />
    </div>
  );
}
