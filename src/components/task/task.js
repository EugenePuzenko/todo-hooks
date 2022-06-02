import React from 'react';
import PropTypes from 'prop-types';

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
    const { message, done, onDeleted, onToggleDone, onEdit, createdTime } = this.props;

    return (
      <li className={done ? ' completed' : ' '}>
        <div className="view">
          <CheckBox onToggleDone={onToggleDone} isChecked={done ? true : false} />
          <Label textContent={message} createdTime={createdTime} />
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </li>
    );
  }
}
