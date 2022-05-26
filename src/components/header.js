import NewTaskForm from "./new-task-form"

const Header = ({placeholder}) => {

    return (
        <header className="header">
            <h1>todos</h1>
            <NewTaskForm className="new-todo" 
                         placeholder={placeholder}
            />
        </header>
    )
};

export default Header;