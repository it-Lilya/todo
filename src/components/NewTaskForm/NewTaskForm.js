import React from "react";

function NewTaskForm(props) {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.querySelector('.new-todo').value.trim()) {
      props.addTask(document.querySelector('.new-todo').value);
      document.querySelector('.new-todo').value = '';
    }
  })

  return (
   <header className="header">
      <h1>Todos</h1>
      <input className="new-todo" 
        placeholder="What needs to be done?"
        defaultValue = ''
        onInput = {(e) => props.setTodo(e.target.value)} />
    </header>
  )
}

export default NewTaskForm;