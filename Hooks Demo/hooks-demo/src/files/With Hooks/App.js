import React, { useState, useEffect } from 'react';

//usually functions are called as stateless components because they don't have state
//with Hooks, now these functions are called as function components
function App() {
  //declare a new state variable, initialize it to 0, which
  // we'll call as count and the function that we will use to update 'count' is setCount
  const [count, setCount] = useState(0); //this is the state hook!
  
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;
