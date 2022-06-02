import TodoCount from './todo-count';
import TasksFilter from './tasks-filter';
import ClearCompleted from './clear-completed';

const Footer = ({ todoCount, clearСompleted, onToggleTab, tabList, filterFunc }) => {
  return (
    <footer className="footer">
      <TodoCount todoCount={todoCount} />
      <TasksFilter onToggleTab={onToggleTab} tabList={tabList} filterFunc={filterFunc} />
      <ClearCompleted clearСompleted={clearСompleted} />
    </footer>
  );
};

export default Footer;
