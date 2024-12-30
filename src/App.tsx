import User from "./components/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import Home from "./components/Home";

import Hometask1 from "./components1/Hometask1";
import Usertask1 from "./components1/Usertask1";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/users/:id" element={<UserDetails />} />
           
           <Route path="/" element={<Hometask1 />} />
            <Route path="/usertask1" element={<Usertask1 />} />
            <Route path="/usertask1/:id" element={<Usertask1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
