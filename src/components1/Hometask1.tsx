import React from 'react';
import { Link } from 'react-router-dom';
import "./Hometask1.css";

const Hometask1: React.FC = () => {
  return (
    <div className="container">
      <h1 className='headding'><u>Home Task 1</u></h1> <br />
      <p className='name'> Welcome to the Home Task 1 page..</p>
      <Link to="/usertask1" className='btn-user'>Users</Link>
    </div>
  );
};

export default Hometask1;


