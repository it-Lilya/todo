import React from "react";

function NewTaskForm({addItem}) {
  function onChangeNewTodo(e) {
    e.preventDefault();
    addItem('view', e.target.querySelector('input').value);
    setTimeout(() => document.querySelector('.new-todo').value = '');
  }

  return (
   <header className="header">
      <h1>Todos</h1>
      <form className="form__new-todo" onSubmit={(e) => onChangeNewTodo(e)}>
        <input className="form__new-todo new-todo" 
          placeholder="What needs to be done?"
          defaultValue = '' />
      </form>
      
    </header>
  )
}

export default NewTaskForm;