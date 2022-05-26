import TaskList from "./task-list"
import Footer from "./footer"

const Main = ( {tasksList} ) => {

    return (
        <section className="main">
            <TaskList tasksList={tasksList}/>
            <Footer />
        </section>
    )
};

export default Main;