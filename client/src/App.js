import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import AddMovie from "./components/AddMovie";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movie/add" component={AddMovie} />
      </Switch>
    </div>
  );
}

export default App;
