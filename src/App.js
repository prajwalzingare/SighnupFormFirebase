import Sighnup from "./components/Sighnup";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* what will hapeen hear is that if user try to acess dashboard without login it will render login page logic of that written in Private route */}
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/sighnup" element={<Sighnup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
