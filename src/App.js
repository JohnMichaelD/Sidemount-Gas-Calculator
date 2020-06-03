import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
      super(props) 
      this.state={
        leftTankThird: "...",
        step: "input"

      }

    }
    calculateThirds() {
      let leftTankPressure = document.getElementById("lTankPressure").value
      let leftTankThird = Math.floor(leftTankPressure/3)
      console.log(leftTankThird)

      if (leftTankThird === 10) {
        console.log("it's gonna blow!")
      } else {
        console.log("you're okay")
      }

      let rightTankPressure=document.getElementById("rTankPressure").value
      let rightTankThird=Math.floor(rightTankPressure/3)
      console.log(rightTankThird)

      this.setState({
        leftTankThird: leftTankThird,
        rightTankThird: rightTankThird,
        leftTankPressure: leftTankPressure,
        rightTankPressure: rightTankPressure,
        step: "thirds"
      })
    }

    addTogether() {
      let sum=this.state.leftTankThird + this.state.rightTankThird
      this.setState({
        step: "addedTogether",
        addTogether:sum
      })
      
    }

    subtractDifference(){
      let sum=this.state.addTogether - (this.state.leftTankPressure - this.state.rightTankPressure)
      this.setState({subtractDifference:sum})
    }
    divide(){
      
    }
    
    render() {
      return (
        <div className="App">
            <h1>Sidemount Gas Calculator</h1>
            <div className="tankPressureRow">
              <p>Left Tank Pressure:</p> 
              <input className="pressureInput" id="lTankPressure"></input>
            </div>
            <div className="tankPressureRow">
              <p>Right Tank Pressure:</p>
              <input className="pressureInput" id="rTankPressure"></input>
            </div>

            {this.state.step === "input" ? <div onClick={()=>{this.calculateThirds()}} className="answerButton"> Calculate Thirds</div> : ""}
            {this.state.step === "thirds" ? <div onClick={()=>{this.addTogether()}} className="answerButton"> Add Together</div> : ""}
            {this.state.step === "addedTogether" ? <div onClick={()=>{this.subtractDifference()}} className="answerButton"> Subtract Difference</div> : ""}
            {this.state.step === "subtractDifference" ? <div onClick={()=>{this.divide()}} className="answerButton"> Divide in Half</div> : ""}

            <div className="tankPressureRow">
              <p>L Third : R Third</p>
              <p>{this.state.leftTankThird}:{this.state.rightTankThird}</p>
            </div>
            <div className="tankPressureRow">
              <p>Add Together:</p>
              <p>{this.state.addTogether}</p>
            </div>
            <div className="tankPressureRow"> 
              <p>Subtract Difference:</p>
              <p>{this.state.subtractDifference}</p>
            </div>
            <div className="tankPressureRow">
              <p>Divide in Half</p>
              <p>{this.state.divide}</p>
            </div>
        </div>
      );
    }
}
export default App;
