import User from "./components/User";
import { Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails";
import Home from "./components/Home";

import Usertask1 from "./components1/Usertask1";

import Albums from "./Dcomponents/Albums";
import AlbumId from "./Dcomponents/AlbumId";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<User />} />
        <Route path="/user/:id" element={<UserDetails />} />

        <Route path="/usertask1" element={<Usertask1 />} />
        <Route path="/usertask1/:id" element={<Usertask1 />} />

        <Route path="/albums" element={<Albums />} />
        <Route path="/album/:id" element={<AlbumId />} />
      </Routes>
    </>
  );
}

export default App;
