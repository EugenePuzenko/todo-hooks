import React from 'react';

import { formatTimer } from '../helpers/actions';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    addTask: () => {},
  };

  state = {
    value: '',
    min: '',
    sec: '',
  };

  inputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  inputMin = (e) => {
    const minutes = e.target.value.replace(/\D/g, '');
    this.setState({
      min: minutes,
    });
  };

  inputSec = (e) => {
    let seconds = e.target.value.replace(/\D/g, '');
    if (seconds > 59) seconds = 59;
    this.setState({
      sec: seconds,
    });
  };

  formSubmit = (e) => {
    e.preventDefault();
    const { value, min, sec } = this.state;
    const timer = formatTimer(min + ':' + sec);
    const timerType = timer === '00:00' ? 'increase' : 'decrease';
    this.props.addTask(value, timer, timerType);

    this.setState({
      value: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.formSubmit}>
        <input
          name="title"
          type="text"
          className="new-todo"
          placeholder="Task"
          onChange={this.inputChange}
          value={this.state.value}
        />
        <input
          name="min"
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.inputMin}
          value={this.state.min}
          autoComplete="off"
          maxLength="2"
        />
        <input
          name="sec"
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.inputSec}
          value={this.state.sec}
          autoComplete="off"
          maxLength="2"
        />
        <button type="submit" />
      </form>
    );
  }
}
