import React from 'react'

export default class JoinQueueForm extends React.Component {


    render() {
        return (
            <form onSubmit = {(e) => this.props.joinAdoptionQueue(e)}>
                <label htmlFor = 'name'> To join the queue just submit your name: </label>
                <input name = 'name' onChange = {(e) => this.props.getValFromInput(e)}/>
                <input type = 'submit' />
            </form>
        )
    }
}