import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Slider from 'material-ui/Slider';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      value: 0,
      startTime: undefined,
      endTime: undefined,
    };
  }

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleCalculate = () => {
    this.setState({startTime: new Date().getTime(), endTime: undefined });
    return fetch('http://localhost:3000/calculate?depth=' + this.state.value).then(result => result.json()).then(() => {
      this.setState({endTime: new Date().getTime()});
    }).catch(() => {
      this.setState({})
    });
  };

  reset = () => {
    this.setState({
      value: 0,
      startTime: undefined,
      endTime: undefined
    });
  };

  render() {
    return (
      <div className="App">
        <div onClick={this.reset} style={{cursor: 'pointer', fontWeight: 'bold'}}>Reset</div>
        <MuiThemeProvider>
          <Slider name={'Depth'} min={0} max={20} step={1} value={this.state.value} onChange={this.handleChange}
                  onDragStop={this.handleCalculate}/>
        </MuiThemeProvider>
        <p>
          <div>{ 'Calculation Tree Depth: ' + this.state.value }</div>
          { this.state.startTime && this.state.endTime ?
            <div>{ 'Calculation Time : ' + (this.state.endTime - this.state.startTime) + ' milliseconds' }</div> : "..." }
        </p>
      </div>
    );
  }
}

export default App;