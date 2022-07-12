import PropTypes from 'prop-types';
import classNames from 'classnames';

import CheckBox from './check-box';
import Label from './label';

const Task = ({ message, done, onDeleted, onToggleDone, onEdit, createdTime, timer, onStartClick, onStopClick }) => {
  const isCompletedClass = classNames({
    ' ': !done,
    ' completed': done,
  });

  return (
    <li className={isCompletedClass}>
      <div className="view">
        <CheckBox onToggleDone={onToggleDone} isChecked={done ? true : false} />
        <Label
          message={message}
          timer={timer}
          createdTime={createdTime}
          onStartClick={onStartClick}
          onStopClick={onStopClick}
        />
        <button className="icon icon-edit" onClick={onEdit} />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    </li>
  );
};

Task.propTypes = {
  message: PropTypes.string,
  done: PropTypes.bool,
};

Task.defaultProps = {
  onEdit: () => {},
  onDeleted: () => {},
};

export default Task;
