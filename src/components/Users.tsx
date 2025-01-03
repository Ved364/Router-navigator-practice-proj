import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useNavigate, useLocation } from "react-router-dom";

type User = {
  id: number;
  username: string;
  name: string;
  email: string;
};

type Name = {
  navName: string;
  navLink: string;
};

const Users = () => {
  const names: Name[] = [
    { navName: "Dhanusree", navLink: "/albums" },
    { navName: "Jaya Chandra", navLink: "/Usertask1" },
  ];

  const [data, setData] = useState<User[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleRowsChange = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  const handleUserpage = () => {
    navigate("/home");
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="userBackground UserBackgroundImg">
      <div className="UsersButton">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUserpage}
        >
          Back
        </button>
        <div>
          {names.map((itemName, i) => (
            <button
              key={i}
              type="button"
              onClick={() => navigate(itemName.navLink)}
              className="btn btn-primary"
            >
              {itemName.navName}
            </button>
          ))}
        </div>
      </div>
      <div className="background_table mt-3 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center text-white">Users</h3>
        <table className="content_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User name</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((user, index) => (
              <tr key={index} onClick={() => handleRowsChange(user.id)}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Users;
