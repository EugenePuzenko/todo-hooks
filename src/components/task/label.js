import React from 'react';

import { getFormatDistanceToNow, formatTimer } from '../helpers/actions';

export default class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdTime: this.props.createdTime,
      task: this.props.task,
      id: this.props.id,
      currentTimer: this.props.task.timer,
      timerType: this.props.task.timerType,
      running: false,
    };
  }

  componentDidUpdate() {
    if (this.props.done) {
      this.stop();
    }
  }

  componentDidMount() {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      return this.stop();
    });

    this.createdTimerID = setInterval(() => this.tick(), 1000);
    if (this.state.timerType === 'increase') {
      this.increaseTimerID = setInterval(() => this.increaseTimer(), 1000);
    }
    if (this.state.timerType === 'decrease') {
      this.decreaseTimerID = setInterval(() => this.decreaseTimer(), 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.createdTimerID);
    clearInterval(this.increaseTimerID);
    clearInterval(this.decreaseTimerID);
  }

  tick() {
    this.setState({
      createdTime: this.props.createdTime,
    });
  }

  increaseTimer() {
    let time = this.state.currentTimer.split(':');
    let min = +time[0];
    let sec = +time[1];

    sec += 1;
    if (sec === 60) {
      min += 1;
      sec = 0;
    }

    this.setState({
      currentTimer: min + ':' + sec,
    });
  }

  decreaseTimer() {
    let time = this.state.currentTimer.split(':');

    let min = +time[0];
    let sec = +time[1];
    if (min <= 0 && sec <= 0) {
      clearInterval(this.decreaseTimerID);
      this.setState({
        currentTimer: '00:00',
      });
      return;
    } else {
      if (sec >= 1) {
        sec -= 1;
      } else {
        sec = 59;
      }
      if (sec === 59) {
        min -= 1;
      }

      this.setState({
        currentTimer: min + ':' + sec,
      });
    }
  }

  start = () => {
    if (!this.state.running) {
      if (this.state.timerType === 'increase') {
        clearInterval(this.increaseTimerID);
        this.increaseTimerID = setInterval(() => this.increaseTimer(), 1000);
      }

      if (this.state.timerType === 'decrease') {
        clearInterval(this.decreaseTimerID);
        this.decreaseTimerID = setInterval(() => this.decreaseTimer(), 1000);
      }
    }
  };

  stop = () => {
    const savedTasks = JSON.parse(localStorage.getItem('todos'));
    const index = savedTasks.findIndex((el) => el.id === this.state.id);

    const updatedTask = [
      ...savedTasks.slice(0, index),
      { ...savedTasks[index], timer: formatTimer(this.state.currentTimer) },
      ...savedTasks.slice(index + 1),
    ];

    localStorage.setItem('todos', JSON.stringify(updatedTask));

    clearInterval(this.increaseTimerID);
    clearInterval(this.decreaseTimerID);
  };

  onStartClick = () => {
    this.start();
    this.setState({
      running: true,
    });
  };
  onStopClick = () => {
    this.stop();
    this.setState({
      running: false,
    });
  };

  render() {
    const { currentTimer, createdTime } = this.state;
    const { onStartClick, onStopClick } = this;

    return (
      <label>
        <span className="title">{this.props.textContent}</span>
        <span className="description">
          <button className="icon icon-play" onClick={onStartClick}></button>
          <button className="icon icon-pause" onClick={onStopClick}></button>
          <span className="time">{formatTimer(currentTimer)}</span>
        </span>
        <span className="description">created {getFormatDistanceToNow(createdTime)} ago</span>
      </label>
    );
  }
}
