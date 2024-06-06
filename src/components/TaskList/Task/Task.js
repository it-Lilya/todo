import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default function Task({ e = {}, onDeleted, onDone, onEditing }) {
  function timerDistance() {
    const arr = formatDistanceToNow(e.timeMs, { includeSeconds: true }).split(' ');
    let newString = ['created'];
    if (arr[arr.length - 2] === 'a') {
      if (arr[0] === 'less' || arr[0] === 'half') {
        newString.push(arr[0]);
      }
      newString.push('1');
    } else {
      if (arr[0] === 'less' || arr[0] === 'half') {
        newString.push(arr[0]);
      }
      newString.push(arr[arr.length - 2]);
    }
    newString.push(arr[arr.length - 1]);
    newString.push('ago');
    if (document.getElementById(`${e.id}`)) {
      document.getElementById(`${e.id}`).querySelector('.created').textContent = newString.join(' ');
    }
  }
  setInterval(() => {
    timerDistance();
  });
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
        <input className="toggle" type="checkbox" onClick={clickToggle} defaultChecked={check}></input>
        <label>
          <span className="description">{e.span}</span>
          <span className="created">{e.time}</span>
        </label>
        <button className="icon icon-edit" id={e.id} onClick={(btn) => onEditing(e, btn.target)}></button>
        <button className="icon icon-destroy" id={e.id} onClick={onDeleted}></button>
      </div>
    </li>
  );
}

Task.propTypes = {
  e: PropTypes.object,
  onDeleted: PropTypes.func,
  onDone: PropTypes.func,
  onEditing: PropTypes.func,
};
