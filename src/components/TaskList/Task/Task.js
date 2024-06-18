import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Task({ e = {}, onDeleted, onDone, onEditing }) {
  const [flag, setFlag] = useState(e.flag);
  const [timestamp, setTimestamp] = useState(e.difference);
  const [result, setResult] = useState(`created ${timestamp} seconds ago`);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    if (flag) {
      setIntervalId(
        setInterval(() => {
          tick();
        }, 1000)
      );
    } else {
      clearInterval(intervalId);
    }
  }, [flag]);
  const tick = () => {
    setTimestamp((prevT) => prevT + 1);
  };
  useEffect(() => {
    e.difference = timestamp;
  }, [timestamp]);
  useEffect(() => {
    if (timestamp <= 59) {
      setResult(`created ${timestamp} seconds ago`);
    } else if (timestamp > 59 && timestamp <= 3599) {
      setResult(`created ${Math.floor(timestamp / 60)} minutes ago`);
    } else {
      setResult(`created ${Math.floor(timestamp / 3600)} hours ago`);
    }
  }, [timestamp]);
  const playTimer = () => {
    e.flag = true;
    setFlag(true);
    e.label = true;
  };
  const stopTimer = () => {
    clearInterval(intervalId);
    if (e.class !== 'completed') {
      e.flag = false;
      setFlag(false);
      e.label = false;
    }
  };
  let check = false;
  function clickToggle(el) {
    const parentli = el.target.closest('li');
    if (!parentli.classList.contains('completed')) {
      parentli.className = 'completed';
    } else {
      parentli.className = 'view';
      document
        .querySelector('.filters')
        .querySelectorAll('button')
        .forEach((r) => r.classList.remove('selected'));
      document.querySelector('.filters li').firstChild.classList.add('selected');
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
        <input className="toggle" type="checkbox" onClick={(e) => clickToggle(e)} defaultChecked={check}></input>
        <label>
          <span className="title">{e.span}</span>
          <span className="description">
            <button className="icon icon-play" onClick={playTimer}></button>
            <button className="icon icon-pause" onClick={stopTimer}></button>
          </span>
          <span className="description timers">{result}</span>
        </label>
        <button className="icon icon-edit" id={e.id} onClick={(btn) => onEditing(e, btn.target)}></button>
        <button
          className="icon icon-destroy"
          id={e.id}
          onClick={(e) => {
            onDeleted(e);
          }}
        ></button>
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
