import React from 'react'
import { Link } from 'react-router-dom'
import JoinQueueForm from '../JoinQueueForm/JoinQueueForm'
import ShowQueue from '../ShowQueue/ShowQueue'
import Faker, { random } from 'faker'
export default class CatAdoptionPage extends React.Component {

    state = {
        cats: {expanded: false},
        dogs: {expanded: false},
        showInput: false,
        showQueue: false,
        name: '',
        peopleInQueue: [],
        isFirstInQueue: false
    }

    getCats = () => {
        const url = 'http://localhost:8000/pets/cats'
        fetch(url)
        .then(res => res.json())
            .then(res => this.setState({
                cats:
                 { 
                    name: res.name, 
                    breed: res.breed,
                    description: res.description,
                    gender: res.gender,
                    imageURL: res.imageURL,
                    story: res.story,
                    expanded: !this.state.expanded
                }
            }))
        }
    getDogs = () => {
        const url = 'http://localhost:8000/pets/dogs'
        fetch(url)
        .then(res => res.json())
            .then(res => this.setState({
                dogs:
                 { 
                    name: res.name, 
                    breed: res.breed,
                    description: res.description,
                    gender: res.gender,
                    imageURL: res.imageURL,
                    story: res.story,
                    expanded: !this.state.expanded
                }
            }))
        }
    
    joinAdoptionQueue = e => {
        e.preventDefault()
        const url = 'http://localhost:8000/people'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name: this.state.name})
        })
        .then(res => res.json())
        .then(() => this.setState({showInput: false}))
        .then(() => this.getPeopleInQueue())
        .catch(err => console.log(err))
    }
    
    getPeopleInQueue = () => {
        const url = 'http://localhost:8000/people'
        fetch(url)
          .then(res => res.json())
          .then(people => {
            this.setState({
                peopleInQueue: people, showQueue: !this.state.showQueue
            })
            if(this.state.isFirstInQueue === false) {
                this.interval = setInterval(this.timer, 3000)
            }
            
          })
    }

    getValFromInput = (event) => {
        event.preventDefault()
        this.setState({
            name: event.target.value
        })
    }

    showInput = () => {
        this.setState({
            showInput: !this.state.showInput
        })
    }
    
    verifyIfFirstInQueue = () => {
        if(this.state.name === this.state.peopleInQueue[1]) {
            this.setState({isFirstInQueue: true})
            clearInterval(this.interval)
        }
    }

    dequeuePerson = () => {
        this.setState({ peopleInQueue: this.state.peopleInQueue.slice(1)})
        const url = 'http://localhost:8000/people'
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
    }

    enqueueRandomPerson = () => {
        let randomName = Faker.name.findName()
        this.setState({ peopleInQueue: [...this.state.peopleInQueue, randomName]})
        const url = 'http://localhost:8000/people'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({name: randomName})
        })
        .then(res => res.json())
        .then(() => {
            let randomNum = Math.floor(Math.random() * 3)
            console.log(randomNum)
            if(randomNum >= 1) {
                this.adoptPet('cat')
            }
            else {
                this.adoptPet('dog')
            }
        })
        .then(res => console.log(res))
    }
    
    adoptPet = (type) => {
        const url = `http://localhost:8000/pets/${type}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(() => {
            if(type === 'dog') {
                this.getDogs()
            }
            else {
                this.getCats()
            }
        })
    }

    userAdoptPet = (type) => {
        const url = `http://localhost:8000/pets/${type}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(() => {
            if(type === 'dog') {
                this.getDogs()
            }
            else {
                this.getCats()
            }
        })
        .then(() => {
            this.props.history.push('/congratulations')
        })
    }

    timer = () => {
        this.verifyIfFirstInQueue()
        this.dequeuePerson()
        this.enqueueRandomPerson()
    }

    render() {
        return(
            <div>
                <h2> To start on your journey to adoption, first join the adoption qeueue.
                    <br/>
                    Once in the front of queue, view the next available pets up for adoption.
                </h2>
                <div className = 'join-queue-form'>
                    <button onClick = {() => this.showInput()}>First: Join the Adoption Queue </button>
                    {(this.state.showInput)
                     ? <JoinQueueForm 
                        joinAdoptionQueue = {this.joinAdoptionQueue}
                        getValFromInput = {this.getValFromInput}
                    /> : ''}
                </div>
                <div className = 'view-queue'>
                    <button onClick = {() => this.getPeopleInQueue()}>Next: View the current queue to adopt</button>
                    {(this.state.showQueue)
                        ? <ShowQueue
                         people = {this.state.peopleInQueue}
                         />
                        : ''
                    }
                </div>
                <button onClick = {() => this.getCats()}> View the next available cat</button>
                <button onClick = {() => this.getDogs()}> View the next available dog</button>
                {(this.state.dogs.expanded) ? 
                    <>
                        <h2> {this.state.dogs.name} </h2>
                        <img src = {this.state.dogs.imageURL}/>
                        <h3> {this.state.dogs.gender} {this.state.cats.breed}</h3>
                        <p> {this.state.dogs.description} </p>
                        <p> {this.state.dogs.story} </p> 
                        {(this.state.isFirstInQueue) ? <button onClick = {() => this.userAdoptPet('dog')}>Adopt this dog</button> : 'When your first in queue you will be able to adopt'}
                    </>
                        : '' }
                {(this.state.cats.expanded) ? 
                    <>
                        <h2> {this.state.cats.name} </h2>
                        <img src = {this.state.cats.imageURL}/>
                        <h3> {this.state.cats.gender} {this.state.cats.breed}</h3>
                        <p> {this.state.cats.description} </p>
                        <p> {this.state.cats.story} </p>
                        {(this.state.isFirstInQueue) ? <button onClick = {() => this.userAdoptPet('cat')}>Adopt this cat</button> : 'When your first in queue you will be able to adopt'}
                    </>
                        : '' }
            </div>
        )
    }
}