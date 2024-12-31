import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./albums.css";
import { useNavigate } from "react-router-dom";
type Albumtype = {
  userId: number;
  id: number;
  title: string;
};

const Albums = () => {
  const [data, setData] = useState<Albumtype[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const startIndex = lastIndex - recordsPerPage;
  const records = data.slice(startIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
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

  const handleNavId = (id: number) => {
    navigate(`/album/${id}`);
  };

  const tablebody = records.map((album: Albumtype) => (
    <tr key={album.id} onClick={() => handleNavId(album.id)}>
      <td>{album.userId}</td>
      <td>{album.id}</td>
      <td>{album.title}</td>
    </tr>
  ));

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="table-1">
          <h3 className="dh3">Details of Users</h3>
          <table className="d-table">
            <thead>
              <tr>
                <th>USERID</th>
                <th>ID</th>
                <th>TITLE</th>
              </tr>
            </thead>
            <tbody>{tablebody}</tbody>
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

export default Albums;
