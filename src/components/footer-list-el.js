import FooterBtn from "./footer-btn"

const FooterListEl = ({filterText}) => {
    
    return (
        <li>
            <FooterBtn 
            btnText={filterText}
            />
        </li>
    )
};

export default FooterListEl;