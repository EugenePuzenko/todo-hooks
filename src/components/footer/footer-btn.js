import React from 'react';
import PropTypes from 'prop-types';

export default class FooterBtn extends React.Component {
  static defaultProps = {
    onToggleTab: () => {},
    filterFunc: () => {},
  };

  static propTypes = {
    btnText: PropTypes.string,
    isSelected: PropTypes.bool,
  };

  render() {
    const { btnText, onToggleTab, isSelected, filterFunc } = this.props;

    function onClick() {
      onToggleTab();
      filterFunc(btnText);
    }

    return (
      <button className={isSelected ? ' selected' : ''} onClick={onClick}>
        {btnText}
      </button>
    );
  }
}
