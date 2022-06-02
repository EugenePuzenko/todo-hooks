import React from 'react';
import { formatDistanceToNow } from 'date-fns';

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
        <span className="created">
          {' '}
          created {formatDistanceToNow(this.state.currentTime, { includeSeconds: true })} ago{' '}
        </span>
      </label>
    );
  }
}
