import React from 'react';

import Task from '../task/task';

export default class TaskList extends React.Component {
  render() {
    const { onDeleted, onToggleDone, onEdit, onEditInput, onSubmitEdit, getCurrentFilter } = this.props;

    const filtered = getCurrentFilter();

    return (
      <ul className="todo-list">
        {filtered.map((task) => {
          const { id, ...taskInfo } = task;
          if (task.edit === true) {
            return (
              <li className="editing" key={id}>
                <form onSubmit={(e) => onSubmitEdit(id, e)}>
                  <input type="text" className="edit" value={task.message} onChange={(e) => onEditInput(id, e)} />
                </form>
              </li>
            );
          } else {
            return (
              <Task
                key={id}
                {...taskInfo}
                onDeleted={() => onDeleted(id)}
                onToggleDone={() => onToggleDone(id)}
                onEdit={() => onEdit(id)}
              />
            );
          }
        })}
      </ul>
    );
  }
}
