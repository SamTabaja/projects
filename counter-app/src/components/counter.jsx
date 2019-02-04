import React, { Component } from "react";

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }
  handleLike = () => {
    console.log("liked");
  };

  render() {
    return (
      <div className="counter">
        <button
          onClick={() => this.props.onReset(this.props.counter)}
          className="btn btn-danger btn-sm m-2"
        >
          Reset
        </button>

        <span className={this.setSpanBadge()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm m-2"
        >
          +
        </button>

        <button
          onClick={() => this.props.onDecrement(this.props.counter)}
          className="btn btn-secondary btn-sm m-2"
        >
          -
        </button>

        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
        <input
          name="priceFeild"
          type="number"
          value={this.state.value}
          onChange={() => this.props.onInputChange(this.props.counter)}
        />
        <span  style={{color: '#343a40'}}> Total Price: {this.props.price}</span>
        <span> {this.props.data}</span>
      </div>
    );
  }

  setSpanBadge() {
    let classes = "badge m-1 p-2 ";
    classes +=
      this.props.counter.value === 0 ? "badge-warning" : "badge-primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? 0 : value;
  }
}

export default Counter;
