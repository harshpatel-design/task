import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Contact from "./components/Contact";
import About from "./components/About";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="App">
      <Header />
      <hr />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="restaurants/:id" element={<ItemList />} />
        <Route path="restaurants" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
