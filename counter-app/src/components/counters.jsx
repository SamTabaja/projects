import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const {
      data,
      price,
      onResetAll,
      counters,
      onDelete,
      onIncrement,
      onReset,
      onDecrement,
      onAddCounter,
      onInputChange,
      onDeleteAll
    } = this.props;
    return (
      <div className="myCounters">
        <button onClick={onResetAll} className="btn btn-primary btn-sm m-2">
          Reset All
        </button>
        <button onClick={onAddCounter} className="btn btn-primary btn-sm m-2">
          Add Counter
        </button>
        <button onClick={onDeleteAll} className="btn btn-primary btn-sm m-2">
          Delete All
        </button>
        {counters.map(counter => (
          
          <Counter
            key={counter.id}
            onDelete={onDelete}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onReset={onReset}
            counter={counter}
            data={data}
            price={price}
            onInputChange={onInputChange}
            
          />
        ))}
      </div>
    );
  }
}

export default Counters;
