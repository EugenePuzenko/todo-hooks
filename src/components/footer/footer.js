import PropTypes from 'prop-types';

import TasksFilter from './tasks-filter';

const Footer = ({ todoCount, clearСompleted, onToggleTab, tabList, filterFunc }) => {
  return (
    <footer className="footer">
      <span className="todo-count"> {todoCount} items left </span>
      <TasksFilter onToggleTab={onToggleTab} tabList={tabList} filterFunc={filterFunc} />
      <button className="clear-completed" onClick={clearСompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todoCount: PropTypes.number,
};

Footer.defaultProps = {
  clearСompleted: () => {},
};

export default Footer;
