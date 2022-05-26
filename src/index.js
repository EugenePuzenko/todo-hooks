import {createRoot} from 'react-dom/client';
import Header from './components/header';
import Main from './components/main';


const App = () => {

    const tasksList = [
        {id: 1, message: 'Completed task'},
        {id: 2, message: 'Editing task'},
        {id: 3, message: 'Active task'},
    ];

    return (
        <section className="todoapp">
            <Header placeholder = "What needs to be done?" />
            <Main tasksList = { tasksList }/>
        </section>
    );
};

createRoot(document.getElementById('root')).render(<App />);