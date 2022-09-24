import logo from './logo.svg';
import './App.css';
import FirstPage from './components/firstPage/first_page';
import SecondPage from './components/secondPage/second_page';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<FirstPage/>} />
            <Route exact path="/show_data" element={<SecondPage/>} />
        </Routes>
    </Router>
        
  );
}

export default App;
