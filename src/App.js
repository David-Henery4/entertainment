import "./styles/index.scss";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Navbar} from "./components";

function App() {
  return (
    <div className="App font-outfit font-light min-h-screen bg-darkBlue">
      <Navbar/>
    </div>
  );
}

export default App;
