import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
      super(props) 
      this.state={
        leftTankThird: "..."
      }

    }
    calculateGas() {
      let leftTankPressure=document.getElementById("lTankPressure").value
      let leftTankThird=Math.floor(leftTankPressure/3)
      console.log(leftTankThird)
      this.setState({
        leftTankThird: leftTankThird
      })
    }
    render() {
      return (
        <div className="App">
            <h1>Sidemount Gas Calculator</h1>
            <p>Left Tank Pressure</p> 
              <input id="lTankPressure"></input>
            <p>Right Tank Pressure</p>
              <input id="rTankPressure"></input>
            <p>Third of Left Tank: {this.state.leftTankThird}</p>
            <div onClick={()=>{this.calculateGas()}} className="answerButton"> Click for Answer</div>
        </div>
      );
    }
}
export default App;
