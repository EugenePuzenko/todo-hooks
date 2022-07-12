import PropTypes from 'prop-types';
import classNames from 'classnames';

const FooterListEl = ({ filterText, onToggleTab, isSelected, filterFunc }) => {
  const onClick = () => {
    onToggleTab();
    filterFunc(filterText);
  };

  const isSelectedBtnClass = classNames({
    ' ': !isSelected,
    ' selected': isSelected,
  });

  return (
    <li>
      <button className={isSelectedBtnClass} onClick={onClick}>
        {filterText}
      </button>
    </li>
  );
};

FooterListEl.defaultProps = {
  onToggleTab: () => {},
  filterFunc: () => {},
};

FooterListEl.propTypes = {
  btnText: PropTypes.string,
  isSelected: PropTypes.bool,
};

export default FooterListEl;
