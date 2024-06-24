import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default function Task({ e = {}, onDeleted, onDone, onEditing }) {
  const [intervalId, setIntervalId] = useState();
  const [flag, setFlag] = useState(e.flag);
  const [distanceTimer, setDistanceTimer] = useState(e.timer);
  const [timeDifference, setTimeDifference] = useState(e.distance);
  useEffect(() => {
    e.distance = 0;
    let res = timeDifference;
    if (res !== 0) {
      res = Math.floor((Date.now(new Date()) - res) / 1000);
      let timerArr = e.timer.split(':');
      timerArr[timerArr.length - 1] = String((res / 10 + +timerArr[timerArr.length - 1] / 10) * 10);
      let seconds = Math.floor(+timerArr[timerArr.length - 1].split(' '));
      let difMinutes = Math.floor(Math.floor(+timerArr[timerArr.length - 1].split(' ')) / 60);
      let minutes = Math.floor(+timerArr[timerArr.length - 2].split(' ')) + difMinutes;
      timerArr[timerArr.length - 2] = minutes;
      if (seconds >= 0 && seconds < 10) {
        timerArr[timerArr.length - 1] = `0${seconds}`;
      } else {
        timerArr[timerArr.length - 1] = seconds + 1;
      }
      if (minutes >= 0 && minutes < 10) {
        timerArr[timerArr.length - 2] = `0${minutes}`;
      } else {
        timerArr[timerArr.length - 2] = minutes;
      }
      if (seconds > 59) {
        timerArr[timerArr.length - 2] = +minutes + 1;
        timerArr[timerArr.length - 1] = '00';
        if (minutes >= 0 && minutes < 10) {
          timerArr[timerArr.length - 2] = `0${minutes}`;
        } else {
          timerArr[timerArr.length - 2] = minutes;
        }
        if (minutes === 59) {
          timerArr[timerArr.length - 1] = '00';
          timerArr[timerArr.length - 2] = '00';
          e.timer = `01:${timerArr.join(':')}`;
          setDistanceTimer(e.timer);
        } else {
          e.timer = timerArr.join(':');
          setDistanceTimer(e.timer);
        }
      } else {
        e.timer = timerArr.join(':');
        setDistanceTimer(e.timer);
      }
    }
  }, []);
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
    setIntervalId(clearInterval(intervalId));
    setFlag(false);
    e.flag = false;
    e.label = false;
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
  useEffect(() => {
    if (e.flag === true && e.label === false) {
      e.label = true;
      setIntervalId(
        setInterval(() => {
          tick();
        }, 1000)
      );
    } else {
      e.label = false;
      setIntervalId(clearInterval(intervalId));
    }
  }, [flag]);
  const playTimer = () => {
    if (e.class !== 'completed') {
      e.flag = true;
      setFlag(e.flag);
    }
  };
  const stopTimer = () => {
    e.flag = false;
    setFlag(e.flag);
  };
  useEffect(() => {
    document.querySelector('.filters').addEventListener('click', (el) => {
      let currentCategory = el.target.className.split(' ').join('');
      if (currentCategory === 'completed') {
        if (e.class !== 'completed') {
          setTimeDifference(0);
          if (e.flag === true) {
            e.label = true;
            e.distance = Date.now(new Date());
            setFlag(false);
          }
        } else {
          e.label === false;
          setFlag(false);
          setFlag(false);
        }
      } else {
        if (e.class !== 'completed' && e.flag === true) {
          e.label === false;
          setFlag(true);
          setFlag(true);
        }
      }
    });
  }, []);
  function tick() {
    let timerArr = e.timer.split(':');
    let seconds = timerArr[timerArr.length - 1].split(' ');
    let minutes = +timerArr[timerArr.length - 2].split(' ');
    seconds = +seconds + 1;
    if (seconds >= 0 && seconds < 10) {
      timerArr[timerArr.length - 1] = `0${seconds}`;
    } else {
      timerArr[timerArr.length - 1] = seconds;
    }
    if (seconds > 59) {
      timerArr[timerArr.length - 2] = +timerArr[timerArr.length - 2] + 1;
      timerArr[timerArr.length - 1] = '00';
      if (minutes >= 0 && minutes < 10) {
        timerArr[timerArr.length - 2] = `0${Math.floor(+timerArr[timerArr.length - 2])}`;
      }
      if (minutes === 59) {
        timerArr[timerArr.length - 1] = '00';
        timerArr[timerArr.length - 2] = '00';
        e.timer = `01:${timerArr.join(':')}`;
        setDistanceTimer(e.timer);
      } else {
        e.timer = timerArr.join(':');
        setDistanceTimer(e.timer);
      }
    } else {
      e.timer = timerArr.join(':');
      setDistanceTimer(e.timer);
    }
  }
  return (
    <li id={e.id} className={e.class}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={clickToggle} defaultChecked={check}></input>
        <label>
          <span className="title">{e.span}</span>
          <span className="description">
            <button className="icon icon-play" onClick={() => playTimer()}></button>
            <button className="icon icon-pause" onClick={stopTimer}></button>
            {distanceTimer}
          </span>
          <span className="created">{e.time}</span>
        </label>
        <button className="icon icon-edit" id={e.id} onClick={(btn) => onEditing(e, btn.target)}></button>
        <button
          className="icon icon-destroy"
          id={e.id}
          onClick={(e) => {
            setIntervalId(clearInterval(intervalId));
            e.flag = false;
            setFlag(false);
            e.label = false;
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
