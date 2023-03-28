import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import "./style.css";
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<><Navbar/><Dashboard/></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
