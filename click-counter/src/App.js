import React from 'react';

import './App.css';

function App(props) {
  console.log("app",props);

  return (
    <div onClick={props.badaboom}>This div has been clicked {props.clicks} times</div>
  );
}

export default App;
