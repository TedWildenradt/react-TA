import React from 'react';
import ReactDOM from 'react-dom';
// import cities from './cities';

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

class FormInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      word: '',
      cities: []
    }
  }


  componentDidMount(){
    const cities = []
    fetch(endpoint)
    .then( res => res.json())
    .then( data => cities.push(...data))
    .then(this.setState({cities}))
  }

  findMatches(wordToMatch){
    return this.state.cities.filter( city => {
      const regex = new RegExp(wordToMatch, 'gi');
      return city.city.match(regex) || city.state.match(regex);
    })
  }

  handleInput(e){
    

  }


  render(){
    return(
      <div>
        <form className="search-form">
          <input type="text" className="search" placeholder="City or State" onChange={this.handleInput} value={this.state.word}/>

        </form>
      </div>
    )
  }
}

export default FormInput;