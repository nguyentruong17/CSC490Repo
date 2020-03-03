import React, { Component } from 'react';

//class
class App extends Component {
  constructor(props) {
    super(props);
    //initialize our state
    this.state = {
      count: 0
    }
  }

  //duplicate the code between these two lifecycle methods in class.
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  //update our state when click the button
  handleOnClick = (e) => {
    this.setState({
      count: this.state.count+1
    })
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={this.handleOnClick}>
          Click me
      </button>
      </div>
    )
  }
}

export default App;
