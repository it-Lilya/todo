import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default function Task({ e = {}, onDeleted, onDone, onEditing }) {
  // const [currentTimer, setCurrentTimer] = useState();
  const [flag, setFlag] = useState(true);
  const [spacing, setSpacing] = useState();
  const [timestamp, setTimestamp] = useState(e.timeMs);
  // const [number, setNumber] = useState(0);
  // const [timearr, setTimearr] = useState(0);
  function timerDistance() {
    const arr = formatDistanceToNow(timestamp, { includeSeconds: true }).split(' ');
    // console.log(setTimestamp, setNumber);
    // if (+arr[arr.length - 1] === 'seconds') {
    //   setTimearr(arr[arr.length - 2] * 1000);
    // } else {
    //   setTimearr(arr[arr.length - 2] * 60000);
    // }
    // setTimearr(arr[arr.length - 2]);
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
      newString.push(+arr[arr.length - 2]);
    }
    newString.push(arr[arr.length - 1]);
    newString.push('ago');
    if (document.getElementById(`${e.id}`)) {
      document.getElementById(`${e.id}`).querySelector('.description').nextSibling.textContent = newString.join(' ');
    }
    if (arr[arr.length - 1] === 'seconds') {
      setTimestamp(timestamp + +arr[arr.length - 2] * 1000);
    } else {
      setTimestamp(timestamp + +arr[arr.length - 2] * 60000);
    }
  }
  useEffect(() => {
    if (flag === true) {
      setSpacing(setInterval(() => timerDistance(), 1000));
    } else {
      setSpacing(clearInterval(spacing));
    }
  }, [flag]);
  // function jasdhksad() {
  //   console.log(timestamp - timearr, setTimestamp);
  //   // if (timearr[timearr.length - 1] === 'seconds') {
  //   //   setTimestamp(Math.ceil(Date.now(new Date()) - +timearr[timearr.length - 2] / 1000));
  //   // } else {
  //   //   if (timearr[timearr.length - 2] === 'a') {
  //   //     setTimestamp(Math.ceil(Date.now(new Date() / 60000) - 1) * 60000);
  //   //   } else {
  //   //     setTimestamp(Math.ceil(Date.now(new Date()) - +timearr[timearr.length - 2] / 60000));
  //   //   }
  //   // }
  // }
  function curT() {
    setFlag(true);
  }
  function stopTimer() {
    setFlag(false);
  }
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
          <span className="title">{e.span}</span>
          <span className="description">
            <button className="icon icon-play" onClick={curT}></button>
            <button className="icon icon-pause" onClick={stopTimer}></button>
          </span>
          <span className="description">{e.time}</span>
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
