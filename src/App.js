import React from 'react';
import {Router} from "@reach/router"
import Login from "./components/Login"
import ToolAdd from "./components/ToolAdd"
import ToolDetail from "./components/ToolDetail"
import ToolList from "./components/ToolList"


function App() {
  return (
    <div>
      <Router>
        <ToolList path="/" default/>  
        <Login path="/signin"/>
        <ToolAdd path="/dashboard/new"/>
        <ToolDetail path="/dashboard/:id"/>
      </Router>
    </div>
  );
}

export default App;
