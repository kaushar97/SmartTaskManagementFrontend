import AuthTest from "./features/auth/components/AuthTest";
import { apiClient } from "./services/apiClient";

function App() {
  const triggerCheck = async () => {
    try {
      const res = await apiClient.get('/auth/health'); // or '/api/health'
      alert("Success! Check your browser console.");
      console.log(res.data);
    } catch (err) {
      alert("Error! Check your browser console.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Smart Task Management System</h1>
      <p>Frontend application is running successfully!</p>
      <button onClick={triggerCheck} style={{ padding: '10px', margin: '20px' }}>
      Test Health Endpoint
    </button>
     <AuthTest />
    </div>
  );
}

export default App;
