import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header/header';
import Main from '../main/main';
import { ACTIONS, getCurrentTime, storage } from '../helpers/actions';

const App = () => {
  const [tasksList, setTasksList] = useState(storage);
  const [filterType, setFilterType] = useState(ACTIONS.ALL);
  const [tabList, setTabList] = useState([
    { id: uuidv4(), name: ACTIONS.ALL, selected: true },
    { id: uuidv4(), name: ACTIONS.ACTIVE, selected: false },
    { id: uuidv4(), name: ACTIONS.COMPLETED, selected: false },
  ]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasksList));
    window.addEventListener('beforeunload', () => {
      setTasksList(tasksList.map((task) => (task.runningTimer = false)));
      localStorage.setItem('todos', JSON.stringify(tasksList));
    });
  }, [tasksList]);

  const calculateTimer = (id, timerType) => {
    let timerId = setInterval(() => {
      setTasksList((prev) => {
        const index = prev.findIndex((el) => el.id === id);
        let time = prev[index].timer.split(':');
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
            clearInterval(tasksList[index].timerId);
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

        return [...prev.slice(0, index), { ...prev[index], timer: min + ':' + sec, timerId }, ...prev.slice(index + 1)];
      });
    }, 1000);
  };

  const onStartClick = (id) => {
    const index = tasksList.findIndex((el) => el.id === id);
    const { timerType, runningTimer } = tasksList[index];

    if (!runningTimer) {
      calculateTimer(id, timerType);
    }

    return setTasksList([
      ...tasksList.slice(0, index),
      { ...tasksList[index], runningTimer: true },
      ...tasksList.slice(index + 1),
    ]);
  };

  const onStopClick = (id) => {
    const index = tasksList.findIndex((el) => el.id === id);
    const { timerId } = tasksList[index];
    clearInterval(timerId);
    setTasksList([
      ...tasksList.slice(0, index),
      { ...tasksList[index], runningTimer: false },
      ...tasksList.slice(index + 1),
    ]);
  };

  const deleteTask = (id) => {
    onStopClick(id);
    setTasksList(tasksList.filter((el) => el.id !== id));
  };

  const addTask = (inputText, timer, timerType) => {
    if (inputText) {
      setTasksList([
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
      ]);
    } else return;
  };

  const onToggleDone = (id) => {
    onStopClick(id);
    const index = tasksList.findIndex((el) => el.id === id);
    setTasksList([
      ...tasksList.slice(0, index),
      { ...tasksList[index], done: !tasksList[index].done, runningTimer: false },
      ...tasksList.slice(index + 1),
    ]);
  };

  const clearСompleted = () => {
    setTasksList(tasksList.filter((el) => el.done === false));
  };

  const onToggleTab = (id) => {
    tabList.map((el) => (el.selected = false));
    const index = tabList.findIndex((el) => el.id === id);

    setTabList([
      ...tabList.slice(0, index),
      { ...tabList[index], selected: !tabList[index].selected },
      ...tabList.slice(index + 1),
    ]);
  };

  const filterFunc = (filterName) => {
    setFilterType(filterName);
  };

  const getCurrentFilter = () => {
    if (filterType === ACTIONS.ALL) {
      return tasksList;
    }
    if (filterType === ACTIONS.ACTIVE) {
      return tasksList.filter((el) => !el.done);
    }
    if (filterType === ACTIONS.COMPLETED) {
      return tasksList.filter((el) => el.done);
    }
  };

  const onEdit = (id) => {
    const index = tasksList.findIndex((el) => el.id === id);
    setTasksList([
      ...tasksList.slice(0, index),
      { ...tasksList[index], edit: !tasksList[index].edit },
      ...tasksList.slice(index + 1),
    ]);
  };

  const onEditInput = (id, e) => {
    const index = tasksList.findIndex((el) => el.id === id);
    setTasksList([
      ...tasksList.slice(0, index),
      { ...tasksList[index], message: e.target.value },
      ...tasksList.slice(index + 1),
    ]);
  };

  const onSubmitEdit = (id, e) => {
    e.preventDefault();
    const index = tasksList.findIndex((el) => el.id === id);
    setTasksList([
      ...tasksList.slice(0, index),
      { ...tasksList[index], message: e.target[0].value, edit: !tasksList[index].edit },
      ...tasksList.slice(index + 1),
    ]);
  };

  const getCount = () => {
    return tasksList.filter((el) => !el.done).length;
  };

  const todoCount = getCount();

  return (
    <section className="todoapp">
      <Header onAddTask={addTask} />
      <Main
        onDeleted={deleteTask}
        onToggleDone={onToggleDone}
        todoCount={todoCount}
        clearСompleted={clearСompleted}
        onToggleTab={onToggleTab}
        tabList={tabList}
        filterFunc={filterFunc}
        getCurrentFilter={getCurrentFilter}
        onEdit={onEdit}
        onEditInput={onEditInput}
        onSubmitEdit={onSubmitEdit}
        onStartClick={onStartClick}
        onStopClick={onStopClick}
      />
    </section>
  );
};

export default App;
