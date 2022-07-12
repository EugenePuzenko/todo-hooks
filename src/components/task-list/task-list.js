import Task from '../task/task';

const TaskList = ({
  onDeleted,
  onToggleDone,
  onEdit,
  onEditInput,
  onSubmitEdit,
  getCurrentFilter,
  onStartClick,
  onStopClick,
}) => {
  const filteredTodos = getCurrentFilter();

  return !filteredTodos.length ? (
    <p className="empty-tasks-list">This list is empty</p>
  ) : (
    <ul className="todo-list">
      {filteredTodos.map((task) => {
        const { id, ...taskInfo } = task;
        return task.edit ? (
          <li className="editing" key={id}>
            <form onSubmit={(e) => onSubmitEdit(id, e)}>
              <input type="text" className="edit" value={task.message} onChange={(e) => onEditInput(id, e)} />
            </form>
          </li>
        ) : (
          <Task
            key={id}
            {...taskInfo}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            onEdit={() => onEdit(id)}
            id={id}
            onStartClick={() => onStartClick(id)}
            onStopClick={() => onStopClick(id)}
          />
        );
      })}
    </ul>
  );
};

export default TaskList;
