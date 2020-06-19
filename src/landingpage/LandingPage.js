import React from 'react'
import { Link } from 'react-router-dom'

export default class LandingPage extends React.Component {

    render() {
        return (
            <div className = 'landingPage-container'> 
                <h1> Welcome To Petful </h1> 
                <h2>We are a first in first out adoption center <br />
                    If you would like to join the queue to adopt click
                    <Link to = '/adoption'> here </Link>
                </h2>
                <br />
            </div>
        )
    }
}