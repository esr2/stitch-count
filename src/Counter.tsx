import React, { useState } from "react";

export interface CounterDetails {
  name: string;
  notes: object;
  numRows: number;
  showRelativeIndex?: boolean;
  showRepeats?: boolean;
  repeats: { startIndex: number; maxRepeats: number }[];
}

function Counter(props: CounterDetails) {
  return <li className="list-group-item">{props.name}</li>;
}

Counter.defaultProps = {
  name: "",
  showRepeats: false,
  showRelativeIndex: false,
  notes: [],
  numRows: -1,
  repeats: [],
};

export default Counter;
