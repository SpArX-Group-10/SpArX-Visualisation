import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Flow from "./Visualisation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Flow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
