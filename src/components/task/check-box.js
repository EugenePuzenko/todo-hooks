import PropTypes from 'prop-types';

const CheckBox = ({ onToggleDone, isChecked }) => {
  return <input className="toggle" type="checkbox" onChange={onToggleDone} checked={isChecked} />;
};

CheckBox.propTypes = {
  isChecked: PropTypes.bool,
};

CheckBox.defaultProps = {
  onToggleDone: () => {},
};

export default CheckBox;
