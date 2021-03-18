import React from 'react';
import logo from './logo.svg';
import diver from './Sidemount2.png';
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

  //
  calculateThirds() {
    let leftTankPressure = document.getElementById("lTankPressure").value
    let leftTankThird = Math.floor(leftTankPressure / 3)
    console.log(leftTankThird)

    if (leftTankThird >= 15) {
      console.log("it's gonna blow!")
    } else {
      console.log("you're okay")
    }

    let rightTankPressure = document.getElementById("rTankPressure").value
    let rightTankThird = Math.floor(rightTankPressure / 3)
    console.log(rightTankThird)

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

  addTogether() {
    let sum = this.state.leftTankThird + this.state.rightTankThird
    this.setState({
      step: "addedTogether",
      addTogether: sum
    })

  }

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

  //HTML code begins here.
  render() {
    return (

      <div className="App">

        <div>
          <header className="navbar">
            <h1>Sidemount Calc</h1>
            <nav className="nav">
              <ul>
                <li><a href=""> HOME </a></li>
                <li><a href=""> ABOUT </a></li>
              </ul>
            </nav>
            {/*
                  <details>
                    <summary>What is this?</summary>
                    <p className="details1">This is a calculator to help you memorize the steps in finding the thirds and turn pressure of two 3000psi rated tanks before each dive.</p>
                    <br></br>
                    <p className="details1">Instructions: Insert the starting tank pressures as two digit numbers. Ex: 3000psi and 2900psi should be entered as 30 and 29. </p>
                  </details>
                  */}
          </header>

          {/*Full Calculator Contianer*/}
          <div className="calculator">
            <div className="tankPressureRow">
              <p>Left Tank Pressure:</p>
              <input className="pressureInput" id="lTankPressure"></input> <p>PSI</p>
            </div>
            <div className="tankPressureRow">
              <p2>Right Tank Pressure:</p2>
              <input className="pressureInput" id="rTankPressure"></input> <p>PSI</p>
            </div>

            {this.state.step === "input" ? <div onClick={() => { this.calculateThirds() }} className="answerButton">Calculate Thirds</div> : ""}
            {this.state.step === "thirds" ? <div onClick={() => { this.addTogether() }} className="answerButton">Add Together</div> : ""}
            {this.state.step === "addedTogether" ? <div onClick={() => { this.subtractDifference() }} className="answerButton">Subtract Difference</div> : ""}
            {this.state.step === "subtractDifference" ? <div onClick={() => { this.divide() }} className="answerButton">Divide in Half</div> : ""}
            {this.state.step === "divide" ? <div onClick={() => { this.subtractFromLowerTank() }} className="answerButton">Subtract From Lower Tank</div> : ""}
            {this.state.step === "subtractFromLowerTank" ? <div onClick={() => { this.finalResult() }} className="answerButton">So Turn Pressure =</div> : ""}
            {this.state.step === "finalResult" ? <div onClick={() => { this.finalResult() }} className="answerButton">Done!</div> : ""}
            {this.state.step === "refresh" ? <div onClick={() => { this.refresh() }} className="answerButton">Refresh?</div> : ""}

            <div className="tankPressureRow">
              <p>Left Third : Right Third</p>
              <p>{this.state.leftTankThird}:{this.state.rightTankThird}</p>
            </div>

            <div className="tankPressureRow">
              <p>Add Together:</p>
              <p>{this.state.addTogether}</p>
            </div>

            <div className="tankPressureRow">
              <span className="SubDifSpan">
                <p>Subtract Difference:</p>
                <details>
                  <summary>?</summary>
                  <p className="detailsSubDif">Subtract the difference of the two original tank pressures from the two thirds added togethergit.</p>
                </details>
                <p>{this.state.subtractDifference}</p>
              </span>
            </div>

            <div className="tankPressureRow">
              <p>Divide in Half:</p>
              <p>{this.state.divide}</p>
            </div>

            <div className="tankPressureRow">
              <p>Subtract From Lower Tank:</p>
              <p>{this.state.subtractFromLowerTank}</p>
            </div>

            {/* */}
            <div className="finalResult">
              <h2>Turn Pressure:</h2> <h2>{this.state.finalResult}</h2>
            </div>
          </div>

          <footer className="footer">
            <p>Built by JMD™</p>
          </footer>
        </div>
      </div>
    );
  }
}
export default App;
