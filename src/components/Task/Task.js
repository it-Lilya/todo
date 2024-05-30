import React from "react";

function clickToggle(e) {
  const parentli = e.target.closest('li');
  if (!parentli.classList.contains('completed')) {
    parentli.className = 'completed';
  } else {
    parentli.className = '';
  }
}
// function deleteElem(e) {
//   console.log(e.target)
// }

function Task({todoData, onDeleted}) {
  // console.log(onDeleted)
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
              <button className="icon icon-destroy" id={e.id} onClick={onDeleted}></button>
          </div>
        </li>
        )
      }))
    )
  }
}

export default Task;