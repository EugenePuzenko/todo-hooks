import PropTypes from 'prop-types';

const TodoCount = ({ todoCount }) => {
  return <span className="todo-count"> {todoCount} items left </span>;
};

TodoCount.propTypes = {
  todoCount: PropTypes.number,
};

export default TodoCount;
