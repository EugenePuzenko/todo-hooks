import React from 'react';
import Button from './button';
import CheckBox from './check-box';
import Label from './label';

export default class Task extends React.Component {
    
    state = { isTaskDone: false }

    onCheckBoxClick = () => {
        this.setState(prevState => ({
            isTaskDone: !prevState.isTaskDone
        }));
    }

    render() {
        const { message } = this.props
        const { isTaskDone } = this.state

        let className = ''
        if (isTaskDone) {
            className += " completed"
        }

        return (
            <li className = { className }>
                <div className="view">
                    <CheckBox onClick = { this.onCheckBoxClick } ></CheckBox>
                    <Label textContent = { message } />
                    <Button className="icon icon-edit" />
                    <Button className="icon icon-destroy" />
                </div>
            </li>
        )
    }
};