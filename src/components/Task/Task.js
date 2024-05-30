import React from "react";

function clickToggle(e) {
  const parentli = e.target.closest('li');
  if (!parentli.classList.contains('completed')) {
    parentli.className = 'completed';
  } else {
    parentli.className = '';
  }
}

function Task({todoData}) {
 // console.log(todoData)
  if (todoData) {
    return (
      (todoData.map((e) => {
        return (
          <li key={e.id} id={e.id} className={e.class}>
            <div className="view">
              <input className="toggle" type="checkbox" onClick={clickToggle}/>
              <label>
                <span className="description">{e.span}</span>
                <span className="created">{e.createdTime}</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"
              ></button>
          </div>
        </li>
        )
      }))
    )
  }
}

export default Task;