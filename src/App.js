import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    calculateGas() {
      let leftTankPressure=document.getElementById("lTankPressure").value
      console.log(Math.floor(leftTankPressure/3))
    }
    render( ){
      return (
        <div className="App">
            <h1>Sidemount Gas Calculator</h1>
            <p>Left Tank Pressure</p> 
              <input id="lTankPressure"></input>
            <p>Right Tank Pressure</p>
              <input id="rTankPressure"></input>
            <p>Third of Left Tank</p>
            <div onClick={()=>{this.calculateGas()}} className="answerButton"> Click for Answer</div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
}
export default App;
