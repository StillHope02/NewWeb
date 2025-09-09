import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import OtpScreen from "./OtpScreen";
import MPinScreen from "./MPinScreen";
import Login from "./Login";
import DOBResetScreen from "./DOBResetScreen";
import LastOTP from "./LastOTP";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/otp" element={<OtpScreen />} />
        <Route path="/mpin" element={<MPinScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dateOfbirth" element={<DOBResetScreen />} />
        <Route path="/lastotp" element={<LastOTP />} />
      </Routes>
    </Router>
  );
}

export default App;
