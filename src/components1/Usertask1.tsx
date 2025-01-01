import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Usertask1.css";

const URL = "https://jsonplaceholder.typicode.com/users";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

const Usertask1: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState<User[]>([]);
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });

  const usersPerPage = 2;

  const fetchUserData = async (apiURL: string) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setUserData(data);
      setLoading(false);
      setIsError({ status: false, msg: "" });
      if (response.status === 404) {
        throw new Error("data not found");
      }
    } catch (error) {
      setLoading(false);
      setIsError({
        status: true,
        msg:
          (error as Error).message || "something went wrong, please try again!",
      });
    }
  };

  const fetchUserDetail = async (userId: string) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });

    try {
      const response = await fetch(`${URL}/${userId}`);
      if (response.status === 404) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserDetail(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsError({
        status: true,
        msg:
          (error as Error).message || "Something went wrong, please try again!",
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetail(id);
    } else {
      fetchUserData(URL);
    }
  }, [id]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(userData.length / usersPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isError?.status) {
    return (
      <div className="container">
        <h1>{isError?.msg}</h1>
      </div>
    );
  }

  if (id && userDetail) {
    return (
      <div className="container">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Back
        </button>
        <h1>User Details</h1>
        <table
          style={{ border: "2px solid black", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th> <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userDetail.id}</td>
              <td>{userDetail.name}</td>
              <td>{userDetail.username}</td>
              <td>{userDetail.email}</td>
              <td>{`${userDetail.address.street}, ${userDetail.address.suite}, ${userDetail.address.city}, ${userDetail.address.zipcode}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  const handleBackClick = () => navigate(-1);

  return (
    <>
      {" "}
      <div className="container">
        <button className="btn-back" onClick={handleBackClick}>
          Back
        </button>

        <h1 className="header">
          {" "}
          <u>Users</u>
        </h1>

        <table
          style={{ border: "2px solid black", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((eachUser) => {
              const { id, name, username, email, address } = eachUser;
              return (
                <tr key={id}>
                  <td>
                    <Link to={`/usertask1/${id}`}>{id}</Link>
                  </td>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>
                    {`${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className="btn-pagination"
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {" "}
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default Usertask1;
