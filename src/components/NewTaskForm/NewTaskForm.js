import React from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default function NewTaskForm({ addItem }) {
  function onChangeNewTodo(e) {
    e.preventDefault();
    if (document.querySelector('.new-todo').value.trim().length !== 0) {
      addItem('view', e.target.querySelector('input').value);
      setTimeout(() => (document.querySelector('.new-todo').value = ''));
      document.querySelectorAll('.filters li button').forEach((e) => {
        e.classList.remove('selected');
      });
      document.querySelector('.filters li').firstChild.classList.add('selected');
    }
  }

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="form__new-todo" onSubmit={(e) => onChangeNewTodo(e)}>
        <input className="form__new-todo new-todo" placeholder="What needs to be done?" defaultValue="" />
      </form>
    </header>
  );
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
};
