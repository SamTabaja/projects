import React, { Component } from "react";
import NavBar from "./components/navBar";
import "./App.css";
import Counters from "./components/counters";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 0, finalPrice: 0, inputText: null }
    ],
    value: 0,
    text: "$"
  };

  handleIncrement = counter => {
    let counters = [...this.state.counters];
    let index = counters.indexOf(counter);
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    let counters = [...this.state.counters];
    let index = counters.indexOf(counter);
    if (counters[index].value > 0) {
      counters[index].value--;
    }
    this.setState({ counters });
  };

  handleReset = counter => {
    let counters = [...this.state.counters];
    let index = counters.indexOf(counter);
    counters[index].value = 0;
    this.setState({ counters });
  };

  handleDelete = cid => {
    let counters = this.state.counters.filter(
      c => c.id !== cid
    );
    this.setState({ counters });
  };

  handleResetAll = () => {
    let counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleAddCounter = () => {
    let counters = this.state.counters;
    this.state.counters.push({
      id: this.state.counters.length + 1,
      value: 0
    });
    this.setState({ counters });
    // console.log(this.state.counters);
  };

  handleDeleteAll = () => {
    let counters = [];
    this.setState({ counters });
  };

  handleChange = (counter, ev) => {
    let counters = this.state.counters;
    let index = counters.indexOf(counter);
    let price = ev.target.value * 10;
    // counters[index].finalPrice = price;
    console.log(this.state.counters);
    console.log(index);
    this.setState({ counters });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="main">
        <NavBar
          uniqueItems={
            this.state.counters.filter(c => c.value > 0)
              .length
          }
          totalItems={this.state.counters
            .map(i => i.value)
            .reduce((total, value) => total + value, 0)}
        />
        <main
          className="container"
          style={{ marginLeft: 500 }}
        >
          <Counters
            counters={this.state.counters}
            onResetAll={this.handleResetAll}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onAddCounter={this.handleAddCounter}
            onDeleteAll={this.handleDeleteAll}
            data={this.state.text}
            price={this.state.counters.finalPrice}
            onInputChange={this.handleChange}
          />
        </main>
      </div>
    );
  }
}

export default App;
