import Task from "./task"



const TaskList = ({ tasksList }) => {
    
    return (
        <ul className="todo-list">
            {tasksList.map((task) => {
                return <Task key = {task.id} { ...task }/>
            })}
        </ul>
    )
};




export default TaskList;