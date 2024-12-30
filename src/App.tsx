import User from "./components/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
