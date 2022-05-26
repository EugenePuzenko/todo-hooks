import React from 'react'

export default class Label extends React.Component {
    render() {

        const {textContent} = this.props

        return (
            <label>
                <span className="description">{textContent}</span>
                <span className="created">created 17 seconds ago</span>
            </label>
        )
    }
};