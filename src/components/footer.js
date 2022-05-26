import TodoCount from "./todo-count"
import Filters from "./filters"
import ClearCompleted from "./clear-completed"

const Footer = () => {

    const filtersList = [
        {id: 1, name: "All"},
        {id: 2, name: "Active"},
        {id: 3, name: "Completed"},
    ]
    
    return (
        <footer className="footer">
            <TodoCount />
            <Filters filtersList={filtersList}/>
            <ClearCompleted />
        </footer>
    )
};

export default Footer;