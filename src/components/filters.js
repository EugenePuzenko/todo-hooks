import FooterListEl from "./footer-list-el"


const Filters = ({filtersList}) => {

    return (
        <ul className="filters">
            {filtersList.map((filter) => {
                return <FooterListEl 
                        key={filter.id} 
                        filterText={filter.name}
                        />
            })}
        </ul>
    )
};

export default Filters;