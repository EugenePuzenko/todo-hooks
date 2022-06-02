import React from 'react';

import Header from '../header/header';
import Main from '../main/main';

export default class App extends React.Component {
  maxId = 100;

  state = {
    tasksList: [],

    filterType: 'All',

    tabList: [
      { id: 1, name: 'All', selected: true },
      { id: 2, name: 'Active', selected: false },
      { id: 3, name: 'Completed', selected: false },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ tasksList }) => {
      return {
        tasksList: tasksList.filter((el) => el.id !== id),
      };
    });
  };

  addTask = (inputText) => {
    this.setState(({ tasksList }) => {
      if (inputText) {
        return {
          tasksList: [
            { id: this.maxId++, message: inputText, done: false, createdTime: new Date().getTime() },
            ...tasksList,
          ],
        };
      } else return;
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasksList }) => {
      const index = tasksList.findIndex((el) => el.id === id);
      return {
        tasksList: [
          ...tasksList.slice(0, index),
          { ...tasksList[index], done: !tasksList[index].done },
          ...tasksList.slice(index + 1),
        ],
      };
    });
  };

  clearСompleted = () => {
    this.setState(({ tasksList }) => {
      return {
        tasksList: tasksList.filter((el) => el.done === false),
      };
    });
  };

  onToggleTab = (id) => {
    this.setState(({ tabList }) => {
      tabList.map((el) => (el.selected = false));
      const index = tabList.findIndex((el) => el.id === id);
      return {
        tabList: [
          ...tabList.slice(0, index),
          { ...tabList[index], selected: !tabList[index].selected },
          ...tabList.slice(index + 1),
        ],
      };
    });
  };

  filterFunc = (filterName) => {
    this.setState({ filterType: filterName });
  };

  getCurrentFilter = () => {
    if (this.state.filterType === 'All') {
      return this.state.tasksList;
    }
    if (this.state.filterType === 'Active') {
      return this.state.tasksList.filter((el) => !el.done);
    }
    if (this.state.filterType === 'Completed') {
      return this.state.tasksList.filter((el) => el.done);
    }
  };

  onEdit = (id) => {
    this.setState(({ tasksList }) => {
      const index = tasksList.findIndex((el) => el.id === id);
      return {
        tasksList: [
          ...tasksList.slice(0, index),
          { ...tasksList[index], edit: !tasksList[index].edit },
          ...tasksList.slice(index + 1),
        ],
      };
    });
  };

  onEditInput = (id, e) => {
    this.setState(({ tasksList }) => {
      const index = tasksList.findIndex((el) => el.id === id);
      return {
        tasksList: [
          ...tasksList.slice(0, index),
          { ...tasksList[index], message: e.target.value },
          ...tasksList.slice(index + 1),
        ],
      };
    });
  };

  onSubmitEdit = (id, e) => {
    e.preventDefault();
    this.setState(({ tasksList }) => {
      const index = tasksList.findIndex((el) => el.id === id);
      return {
        tasksList: [
          ...tasksList.slice(0, index),
          { ...tasksList[index], message: e.target[0].value, edit: !tasksList[index].edit },
          ...tasksList.slice(index + 1),
        ],
      };
    });
  };

  getCount = () => {
    return this.state.tasksList.filter((el) => !el.done).length;
  };

  render() {
    const todoCount = this.getCount();

    return (
      <section className="todoapp">
        <Header onAddTask={this.addTask} />
        <Main
          onDeleted={this.deleteTask}
          onToggleDone={this.onToggleDone}
          todoCount={todoCount}
          clearСompleted={this.clearСompleted}
          onToggleTab={this.onToggleTab}
          tabList={this.state.tabList}
          filterFunc={this.filterFunc}
          getCurrentFilter={this.getCurrentFilter}
          onEdit={this.onEdit}
          onEditInput={this.onEditInput}
          onSubmitEdit={this.onSubmitEdit}
        />
      </section>
    );
  }
}
