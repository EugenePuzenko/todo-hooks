import NewTaskForm from './new-task-form';

const Header = ({ onAddTask }) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm className="new-todo" addTask={onAddTask} />
    </header>
  );
};

export default Header;
