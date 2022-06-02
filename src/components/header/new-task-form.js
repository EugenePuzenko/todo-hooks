import React from 'react';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    addTask: () => {},
  };

  state = {
    value: '',
  };

  inputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  formSubmit = (e) => {
    e.preventDefault();
    this.props.addTask(this.state.value);
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.inputChange}
          value={this.state.value}
        />
      </form>
    );
  }
}
