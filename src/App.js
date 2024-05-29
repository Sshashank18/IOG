import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Home from './components/FrontEndDisplay/Home';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ClientDashboard from './components/ClientDashboard';
import NotePad from './components/NotePad';

function App() {
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/signin" element={<Signup />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/client/dashboard" element={<ClientDashboard />}></Route>
          <Route exact path="/notepad" element={<NotePad />}></Route>
          {/* <Route exact path="/analytics" element={}></Route> */}
        </Routes>
      </Router>

    </div>
  );
}

export default App;
