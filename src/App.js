import { Route, Routes } from "react-router-dom";
import AuthForm from "./Component/Auth/AuthForm";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<AuthForm />}/>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
