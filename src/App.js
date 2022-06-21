import React from "react"
import "./App.css"
import Home from "./components/home/Home"
import Employee from "./components/payroll-form/EmployeeForm.jsx"
import Header from "./components/header"
import {
  BrowserRouter as Router,
  Route,
  Switch,

} from "react-router-dom";

// class App extends React.Component {
  // onClick Function
  // onClick = ($event) => {
    // console.log("Add New Employee", $event);
    // window.open(this.url, "_self");
  // };
// 
  function App() {
    return (
      <>
        <Header />
        <Router>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/employee">
              <Employee />
            </Route>
            <Route exact path="/EmployeeForm/:id">
              <Employee />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }


export default App;