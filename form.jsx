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

  findMatches(wordToMatch){
    return this.state.cities.filter( city => {
      const regex = new RegExp(wordToMatch, 'gi');
      return city.city.match(regex) || city.state.match(regex);
    })
  }

  displayMatches(){
    console.log(this)
    const matchArray = findMatches(this.state.word);
    const html = matchArray.map( place => {
      const regex = new RegExp(this.state.word, 'gi')
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
      const stateName =  place.state.replace(regex, `<span class="hl">${this.value}</span>`)
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">${place.population}</span>
        </li>
      `;
      }).join('');
    suggestions.innerHTML = html;
  }

  handleUpdate(field){
    return e => this.setState({
      [field]: e.currentTarget.value
    })
  }
  

  render(){
    return(
      <div>
        <form className="search-form">
          <input type="text" className="search" placeholder="City or State" onChange={this.handleUpdate('word')} value={this.state.word}/>
          <ul className="suggestions">
            <li>Filter for a city</li>
            <li>or a state</li>
          </ul>
        </form>
      </div>
    )
  }
}

export default FormInput;