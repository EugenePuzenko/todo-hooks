import FooterBtn from './footer-btn';

const FooterListEl = ({ filterText, onToggleTab, isSelected, filterFunc }) => {
  return (
    <li>
      <FooterBtn btnText={filterText} onToggleTab={onToggleTab} isSelected={isSelected} filterFunc={filterFunc} />
    </li>
  );
};

export default FooterListEl;
