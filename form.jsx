import React from 'react';
import ReactDOM from 'react-dom';


class FormInput extends React.Component{
  constructor(){
    this.state = {
      word = ''
    }
  }


  render(){
    return(
      <div>
        <form className="search-form">
          <input type="text" className="search" placeholder="City or State"/>

        </form>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded',()=>{

  ReactDOM.render(<FormInput/>, document.getElementById('root'))
})