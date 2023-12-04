import { Routes, Route } from "react-router-dom";

import Navigation from "./routes/Navigation";
import Home from "./routes/Home";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";

function App() {
  return (
    <div className="max-container">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="register" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
