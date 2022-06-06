import React from 'react';

import { getFormatDistanceToNow } from '../helpers/actions';

export default class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTime: this.props.createdTime };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: this.props.createdTime,
    });
  }

  render() {
    return (
      <label>
        <span className="description">{this.props.textContent}</span>
        <span className="created">created {getFormatDistanceToNow(this.state.currentTime)} ago</span>
      </label>
    );
  }
}
