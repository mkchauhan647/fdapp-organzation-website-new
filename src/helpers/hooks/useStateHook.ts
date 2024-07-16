import React, { useState } from "react";

export function useCounter(initialValue: number, limit: number) : {count : number, increment :any, decrement :any, setLimitedCount:any} {
  
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    if (count < limit) {
      setLimitedCount(count + 1);
    }
  };
  
  const decrement = () => {
    if (count >= 0) {
      setLimitedCount(count - 1);
    }
  };
  
  const setLimitedCount = (newCount: number) => {
    if (newCount >= 0 && newCount <= limit) {
      setCount(newCount);
    }
  };

  return { count, increment, decrement, setLimitedCount };
}
