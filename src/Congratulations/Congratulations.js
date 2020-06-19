import React from 'react'
import { Link } from 'react-router-dom'
export default class Congratulations extends React.Component {

    render() {
        return (
            <div>
                <h1> Congrats on adopting your new pet!</h1>
                <Link to = {'/'}> Go Back Home</Link>
            </div>
        )
    }
}