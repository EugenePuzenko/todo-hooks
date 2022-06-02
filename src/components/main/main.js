import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

const Main = ({
  onDeleted,
  onToggleDone,
  todoCount,
  clearСompleted,
  onToggleTab,
  tabList,
  filterFunc,
  getCurrentFilter,
  onEdit,
  onEditInput,
  onSubmitEdit,
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
