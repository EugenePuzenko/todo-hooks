import React from 'react';

export default class FooterBtn extends React.Component {

    state = {
        btnClicked: false
    }

    onButtonClick = () => {
        this.setState({
            btnClicked: true
        });
    };

    render() {
        const {btnText} = this.props
        const { btnClicked } = this.state

        let classNames = ''
        if (btnClicked) {
            classNames += ' selected'
        }

        return (
            <button className = {classNames}
                    onClick = { this.onButtonClick }>
                {btnText}
            </button>
        )
    }
}