import React from 'react'
import LandingPage from '../landingpage/LandingPage'
import { BrowserRouter as Router,
  Switch,
  Route,
  Link 
} from 'react-router-dom'
import CatAdoptionPage from '../adoptionpage/CatAdoptionPage'
import Congratulations from '../Congratulations/Congratulations'
//On landing page ->
  // description of adoption process
  // a pic related to the description
  // button to start the adoption process

// When click adopt ->
  // image of pet appears
  // description of pet
  // pets name gender age, breed
  // story of the pet

// Can only see the next pet up for adoption

// As a user I want to get inline to adopt
  // can see a list of other people waiting to adopt
  // submit name and be added to the end of the list 
  // if a user is not first in line, button to adopt is disabled
  // every 5sec, a user in line adopts a pet
  // every 5sec, ifuser is at front of the line, a new user is added behind them until there are 5 ppl in line

// When adopting a pet 
  // confirmation that pet has been adopted
  // name is removed from the line
  // pet adopted is removed from the view and replaced with another animal


//submit your name, every 5 sec makes a new request to see whos at the front
// 



function Root() {
  return (
    <>
      <Switch>
        <Route exact path = {'/'} component = {LandingPage}/>
        <Route exact path = {'/adoption'} component = {CatAdoptionPage}/>
        <Route exact path = {'/congratulations'} component = {Congratulations} />
      </Switch>
    </>
  )
}

export default Root
