import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CheckBox from './check-box';
import Label from './label';

export default class Task extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    done: PropTypes.bool,
  };

  static defaultProps = {
    onEdit: () => {},
    onDeleted: () => {},
  };

  render() {
    const { message, done, onDeleted, onToggleDone, onEdit, createdTime, timer, id, edit } = this.props;
    const task = JSON.parse(localStorage.getItem('todos'))[
      JSON.parse(localStorage.getItem('todos')).findIndex((el) => el.id === id)
    ];
    const isCompletedClass = classNames({
      ' ': !done,
      ' completed': done,
    });

    return (
      <li className={isCompletedClass}>
        <div className="view">
          <CheckBox onToggleDone={onToggleDone} isChecked={done ? true : false} />
          <Label
            textContent={message}
            timer={timer}
            createdTime={createdTime}
            id={id}
            task={task}
            done={done}
            edit={edit}
          />
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    );
  }
}
