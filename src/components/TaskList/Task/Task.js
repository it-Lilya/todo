import React from "react";
import PropTypes from 'prop-types';

export default function Task({e = 1, onDeleted, onDone, onEditing}) {
  let check = 'false';
  function clickToggle(e) {
    const parentli = e.target.closest('li');
    if (!parentli.classList.contains('completed')) {
      parentli.className = 'completed';
    } else {
      parentli.className = 'view';
    }
    onDone();
  }
  if (e.class === 'completed') {
    check = true;
  } else {
    check = false;
  }
  return (
    <li id={e.id} className={e.class}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={clickToggle} defaultChecked={check} /> 
        <label>
          <span className="description">{e.span}</span>
          <span className="created">{e.time}</span>
        </label>
        <button className="icon icon-edit" id={e.id} onClick={(btn) => onEditing(e, btn.target)}></button>
        <button className="icon icon-destroy" id={e.id} onClick={onDeleted}></button>
      </div>
    </li>
  )
}

Task.propTypes = {
  e: PropTypes.object,
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  onEditing: PropTypes.func,
}