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
    this.findMatches = this.findMatches.bind(this)
    this.displayMatches = this.displayMatches.bind(this)
  }


  componentDidMount(){
    const cities = []
    fetch(endpoint)
    .then( res => res.json())
    .then( data => cities.push(...data))
    .then(this.setState({cities}))
  }

  // Finds cities/states that match the word in state by using a regex
  findMatches(wordToMatch){
    return this.state.cities.filter( city => {
      const regex = new RegExp(wordToMatch, 'gi');
      return city.city.match(regex) || city.state.match(regex);
    })
  }

  // Displays the matches in list form
  displayMatches(){
    if (!this.state.word){
      return(
        <div>
          <li>Filter for a city</li>
          <li>or a state</li>
        </div>
      )
    }
    const matchArray = this.findMatches(this.state.word);
    const html = matchArray.map( place => {
      const regex = new RegExp(this.state.word, 'gi')
      // const cityName = place.city.replace(regex, <span className="hl">{this.state.word}</span>)
      const cityName = place.city
      // const stateName =  place.state.replace(regex, `<span class="hl">${this.state.word}</span>`)
      const stateName =  place.state
      return(
        <li key={place.rank}>
          <span className="name">{cityName}, {stateName}</span>
          <span className="population">{place.population}</span>
        </li>
      );
    });
    return html;
  }

  handleUpdate(field){
    return e => this.setState({
      [field]: e.currentTarget.value
    })

  }
  

  render(){
    const matches = this.displayMatches();
    return(
      <div>
        <form className="search-form">
          <input type="text" className="search" placeholder="City or State" onChange={this.handleUpdate('word')} value={this.state.word}/>
          <ul className="suggestions">
            {matches}
          </ul>
        </form>
      </div>
    )
  }
}

export default FormInput;