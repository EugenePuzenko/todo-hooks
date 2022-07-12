import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

const Main = ({
  onDeleted,
  onToggleDone,
  clearСompleted,
  todoCount,
  onToggleTab,
  tabList,
  filterFunc,
  getCurrentFilter,
  onEdit,
  onEditInput,
  onSubmitEdit,
  onStartClick,
  onStopClick,
}) => {
  return (
    <section className="main">
      <TaskList
        onDeleted={onDeleted}
        onToggleDone={onToggleDone}
        getCurrentFilter={getCurrentFilter}
        onEdit={onEdit}
        onEditInput={onEditInput}
        onSubmitEdit={onSubmitEdit}
        onStartClick={onStartClick}
        onStopClick={onStopClick}
      />
      <Footer
        todoCount={todoCount}
        clearСompleted={clearСompleted}
        onToggleTab={onToggleTab}
        tabList={tabList}
        filterFunc={filterFunc}
      />
    </section>
  );
};

export default Main;
