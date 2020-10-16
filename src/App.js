import React from 'react';
import {Router} from "@reach/router"
import Main from "./pages/Main"
import Login from "./components/Login"
import ToolAdd from "./components/ToolAdd"
import ToolDetail from "./components/ToolDetail"
import ToolList from "./components/ToolList"


function App() {
  return (
    <div>
      <Router>
        <Main path="/" default/>
        <Login path="/signin"/>
        <ToolAdd path="/dashboard/new"/>
        <ToolDetail path="/dashboard/:id"/>
        <ToolList path="/dashboard/cart"/>
      </Router>
    </div>
  );
}

export default App;
