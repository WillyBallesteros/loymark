import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Activities from "./pages/Activities";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Routes >
        <Route exact path="/" element={<Dashboard />}>
          <Route index element={<Activities />} />
          <Route exact path="users" element={<Users />} />
          <Route exact path="activities" element={<Activities />} />
        </Route>
      </Routes >
    </Router>
  );
}

export default App;
