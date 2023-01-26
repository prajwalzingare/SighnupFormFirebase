import Sighnup from "./components/Sighnup";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>
        <Sighnup />
      </div>
    </AuthProvider>
  );
}

export default App;
