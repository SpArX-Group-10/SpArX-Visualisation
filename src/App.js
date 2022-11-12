import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import Flow from "./Visualisation";
import Landing from "./Landing";

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/setup" element={<Landing />} />
                <Route exact path="/visualisation" element={<Flow />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
