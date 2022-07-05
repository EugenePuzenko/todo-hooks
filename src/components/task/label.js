import React from 'react';

import { getFormatDistanceToNow, formatTimer } from '../helpers/actions';

export default class Label extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createdTime: this.props.createdTime,
    };
  }

  componentDidMount() {
    this.createdTimerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.createdTimerID);
  }

  tick() {
    this.setState({
      createdTime: this.props.createdTime,
    });
  }

  render() {
    const { createdTime } = this.state;
    const { onStartClick, onStopClick, message, timer } = this.props;

    return (
      <label>
        <span className="title">{message}</span>
        <span className="description">
          <button className="icon icon-play" onClick={onStartClick}></button>
          <button className="icon icon-pause" onClick={onStopClick}></button>
          <span className="time">{formatTimer(timer)}</span>
        </span>
        <span className="description">created {getFormatDistanceToNow(createdTime)} ago</span>
      </label>
    );
  }
}
