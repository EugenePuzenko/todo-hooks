import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/header';
import Main from '../main/main';
import { ACTIONS, getCurrentTime } from '../helpers/actions';

export default class App extends React.Component {
  state = {
    tasksList: JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : [],

    filterType: ACTIONS.ALL,

    tabList: [
      { id: uuidv4(), name: ACTIONS.ALL, selected: true },
      { id: uuidv4(), name: ACTIONS.ACTIVE, selected: false },
      { id: uuidv4(), name: ACTIONS.COMPLETED, selected: false },
    ],
  };

  componentDidMount() {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();

      this.setState(({ tasksList }) => {
        return {
          tasksList: tasksList.map((task) => ({ ...task, runningTimer: false })),
        };
      });
    });
  }

  calculateTimer(id, timerType) {
    this.setState(({ tasksList }) => {
      const index = tasksList.findIndex((el) => el.id === id);
      let time = tasksList[index].timer.split(':');
      let min = +time[0];
      let sec = +time[1];

      if (timerType === 'increase') {
        sec += 1;
        if (sec === 60) {
          min += 1;
          sec = 0;
        }
      }

      if (timerType === 'decrease') {
        if (min <= 0 && sec <= 0) {
          clearInterval(this.decreaseTimerID);
          min = 0;
          sec = 0;
        } else {
          if (sec >= 1) {
            sec -= 1;
          } else {
            sec = 59;
          }
          if (sec === 59) {
            min -= 1;
          }
        }
      }

      return {
        tasksList: [
          ...tasksList.slice(0, index),
          { ...tasksList[index], timer: min + ':' + sec },
          ...tasksList.slice(index + 1),
        ],
      };
    });
  }

  onStartClick = (id) => {
    const { tasksList } = this.state;
    const index = tasksList.findIndex((el) => el.id === id);
    const { timerType, runningTimer } = tasksList[index];

    if (!runningTimer) {
      if (timerType === 'increase') {
        this.saveTimerId(id, timerType, index);
      }

      if (timerType === 'decrease') {
        this.saveTimerId(id, timerType, index);
      }
    }

    this.setState(({ tasksList }) => {
      return {
        tasksList: [
          ...tasksList.slice(0, index),
          { ...tasksList[index], runningTimer: true },
          ...tasksList.slice(index + 1),
        ],
      };
    });
  };

  saveTimerId = (id, timerType, index) => {
    const timerId = setInterval(() => this.calculateTimer(id, timerType), 1000);
    this.setState(({ tasksList }) => {
      return {
        tasksList: [...tasksList.slice(0, index), { ...tasksList[index], timerId }, ...tasksList.slice(index + 1)],
      };
    });
  };

  onStopClick = (id) => {
    const { tasksList } = this.state;
    const index = tasksList.findIndex((el) => el.id === id);

    clearInterval(tasksList[index].timerId);

    this.setState(({ tasksList }) => {
      return {
        tasksList: [
          ...tasksList.slice(0, index),
          { ...tasksList[index], runningTimer: false },
          ...tasksList.slice(index + 1),
        ],
      };
    });
  };

  deleteTask = (id) => {
    this.onStopClick(id);
    this.setState(({ tasksList }) => {
      return {
        tasksList: tasksList.filter((el) => el.id !== id),
      };
    });
  };

  addTask = (inputText, timer, timerType) => {
    this.setState(({ tasksList }) => {
      if (inputText) {
        return {
          tasksList: [
            {
              id: uuidv4(),
              message: inputText,
              done: false,
              edit: false,
              createdTime: getCurrentTime(),
              timer,
              timerType,
              timerId: 0,
              runningTimer: false,
            },
            ...tasksList,
          ],
        };
      } else return;
    });
  };

  onToggleDone = (id) => {
    this.onStopClick(id);
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
    if (this.state.filterType === ACTIONS.ALL) {
      return this.state.tasksList;
    }
    if (this.state.filterType === ACTIONS.ACTIVE) {
      return this.state.tasksList.filter((el) => !el.done);
    }
    if (this.state.filterType === ACTIONS.COMPLETED) {
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
          onStartClick={this.onStartClick}
          onStopClick={this.onStopClick}
        />
      </section>
    );
  }
}
