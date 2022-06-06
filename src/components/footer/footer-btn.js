import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

    const isSelectedBtnClass = classNames({
      ' ': !isSelected,
      ' selected': isSelected,
    });

    function onClick() {
      onToggleTab();
      filterFunc(btnText);
    }

    return (
      <button className={isSelectedBtnClass} onClick={onClick}>
        {btnText}
      </button>
    );
  }
}
