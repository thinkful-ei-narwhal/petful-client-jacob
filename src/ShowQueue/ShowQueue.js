import React from 'react'

export default class ShowQueue extends React.Component {

    render() {
        return (
            <div>
                {this.props.people.map((person, index) => {
                    return <ul> <li key = {index}> {person} </li> </ul>
                })}
            </div>
        )
    }
}