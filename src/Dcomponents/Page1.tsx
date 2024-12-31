import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./myfile.css";

type Album = {
  userId: number;
  id: number;
  title: string;
};

const Page1 = () => {
  const [Data, setData] = useState([] as Album[]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Data.length / recordsPerPage);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/albums").then((res) => {
      setData(res.data);
    });
  }, []);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="table-1">
          <h3>Details of Users</h3>
          <table>
            <thead>
              <tr>
                <th>USERID</th>
                <th>ID</th>
                <th>TITLE</th>
              </tr>
            </thead>
            <tbody>
              {records.map((album) => (
                <tr key={album.id}>
                  <td>{album.userId}</td>
                  <td>{album.id}</td>
                  <td>{album.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav>
            <div className="buttons">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={prePage}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                </li>

                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={nextPage}
                    disabled={currentPage === npage}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Page1;
