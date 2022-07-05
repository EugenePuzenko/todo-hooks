import React from 'react';

import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';

export default class Main extends React.Component {
  render() {
    const {
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
    } = this.props;

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
  }
}
