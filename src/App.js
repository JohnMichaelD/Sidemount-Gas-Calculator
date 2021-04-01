import React from 'react';
//import logo from './logo.svg';
//import diver from './Sidemount2.png';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      leftTankThird: "?",
      rightTankThird: "?",
      finalResult: "...",
      step: "input"

    }
  }

  calculateThirds() {
    let leftTankPressure = document.getElementById("lTankPressure").value
    let leftTankThird = Math.floor(leftTankPressure / 3)
    console.log(leftTankThird)

    let rightTankPressure = document.getElementById("rTankPressure").value
    let rightTankThird = Math.floor(rightTankPressure / 3)
    console.log(rightTankThird)

    if (leftTankPressure > 45 || rightTankPressure > 45 ) {
      alert("Note: This tool is used to help memorize thirds during in-water checks. For example, if your starting pressure is 2750 psi, round down and input 27. Or funky numbers will apear.")
    } else {
      console.log ("adequate starting pressures")
    }

    //Alert for starting pressures below 1500PSI
    if (leftTankThird >= 15) {
      console.log("it's gonna blow!")
    } else {
      console.log("you're okay")
    }

    //Advisory for low pressure
    if (rightTankPressure <= 15) {
      alert("Warning: Starting a dive with a tank below 1500 PSI / 100 BAR is NOT reccomended.")
    } else if (leftTankPressure <= 15) {
      alert("Warning: Starting a dive with a tank below 1500 PSI / 100 BAR is NOT reccomended.")
    } else {
      console.log("you're okay")
    }

    this.setState({
      leftTankThird: leftTankThird,
      rightTankThird: rightTankThird,
      leftTankPressure: leftTankPressure,
      rightTankPressure: rightTankPressure,
      step: "thirds"
    })
  }

  /*Adds two starting pressures together*/
  addTogether() {
    let sum = this.state.leftTankThird + this.state.rightTankThird
    this.setState({
      step: "addedTogether",
      addTogether: sum
    })
  }

  /*Subtracts the difference of the two starting pressures from sum */
  subtractDifference() {
    let sum = this.state.addTogether - Math.abs(this.state.leftTankPressure - this.state.rightTankPressure)
    this.setState({
      step: "subtractDifference",
      subtractDifference: sum
    })
  }

  divide() {
    let sum = Math.floor(this.state.subtractDifference / 2)
    this.setState({
      step: "divide",
      divide: sum
    })
  }

  subtractFromLowerTank() {
    let subtractedFromLower = this.state.leftTankPressure - this.state.divide
    if (this.state.leftTankPressure - this.state.rightTankPressure >= 0) {
      // left tank is higher pressure
      subtractedFromLower = this.state.rightTankPressure - this.state.divide
    }
    this.setState({
      step: "subtractFromLowerTank",
      subtractFromLowerTank: subtractedFromLower
    })
  }

  finalResult() {
    let sum = this.state.subtractFromLowerTank
    this.setState({
      step: "finalResult",
      finalResult: sum
    })
  }

  
  /*refresh() {
    this.setState({
      step: "refresh"
    })
    window.location.reload(false);
 }*/

  //HTML code begins here.
  render() {
    return (
      <div className="App">

        <header className="header">
          <h1 className="pageTitle">Sidemount Calc</h1>
          <nav className="menuBar">
            <p id="menuItems"> Contact </p>
            <p id="menuItems"> Resources </p>
            <p id="menuItems"> Instructions </p>
          </nav>
        </header>
        <div className="calculator">
        <h2 className="calcTitle">Calculate Turn Pressure for Thirds:</h2>
        <hr className="divLine"></hr>

          <div className="tankPressureRow">
            <p><strong>Left Tank Pressure:</strong></p>
            <input className="pressureInput" id="lTankPressure" placeholder="Example: 29"></input> <p>PSI</p>
          </div>

          <div className="tankPressureRow">
            <p><strong>Right Tank Pressure:</strong></p>
            <input className="pressureInput" id="rTankPressure" placeholder="Example: 33"></input> <p>PSI</p>
          </div>

          {this.state.step === "input" ? <div onClick={() => { this.calculateThirds() }} className="answerButton">Calculate!</div> : ""}
          {this.state.step === "thirds" ? <div onClick={() => { this.addTogether() }} className="answerButton">Next Step</div> : ""}
          {this.state.step === "addedTogether" ? <div onClick={() => { this.subtractDifference() }} className="answerButton">Next Step</div> : ""}
          {this.state.step === "subtractDifference" ? <div onClick={() => { this.divide() }} className="answerButton">Next Step</div> : ""}
          {this.state.step === "divide" ? <div onClick={() => { this.subtractFromLowerTank() }} className="answerButton">Next Step</div> : ""}
          {this.state.step === "subtractFromLowerTank" ? <div onClick={() => { this.finalResult() }} className="answerButton">TP equals:</div> : ""}
          {this.state.step === "finalResult" ? <div onClick={() => { this.finalResult() }} className="answerButton">Done!</div> : ""}
          {/*{this.state.step === "refresh" ? <div onClick={() => { this.refresh() }} className="answerButton">Restart</div> : ""}*/}

          <hr className="divLine"></hr>

          <div className="tankPressureRow">
            <p>Left Third : Right Third</p>
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
            <p>Divide in Half:</p>
            <p>{this.state.divide}</p>
          </div>

          <div className="tankPressureRow">
            <p>Subtract From Lower Tank:</p>
            <p>{this.state.subtractFromLowerTank}</p>
          </div>

          <div className="finalResult">
            <h2>Turn Pressure Is:</h2> 
            <h2>{this.state.finalResult}</h2>
          </div>

          <hr className="divLine"></hr>

          <button className="answerButton2" onClick={() => window.location.reload(false)}>Restart</button>

        </div>

        <footer className="footer">
          <a id="footerText" href="https://github.com/JohnMichaelD">&copy; 2021 JMD</a>
        </footer>

      </div>
    );
  }
}
export default App;
