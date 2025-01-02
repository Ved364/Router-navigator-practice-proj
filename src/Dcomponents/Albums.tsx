import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./albums.css";
import { useNavigate, useLocation } from "react-router-dom";
type Albumtype = {
  userId: number;
  id: number;
  title: string;
};

const AlbumsPage = () => {
  const [data, setData] = useState<Albumtype[]>([]);
  const location = useLocation();
  //   console.log(location);
  const query = new URLSearchParams(location.search);
  console.log(query);
  const initialPage = Number(query.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  //   const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  // const lastIndex = currentPage * recordsPerPage;
  const startIndex = currentPage * recordsPerPage - recordsPerPage;
  // const records = data.slice(startIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/albums?_start=${startIndex}&_limit=${recordsPerPage}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [startIndex]);

  const prePage = () => {
    if (currentPage !== 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      navigate(`?_start=${startIndex}&_limit=${recordsPerPage}`);
      navigate(`?page=${newPage}`);
    }
  };
  const nextPage = () => {
    if (currentPage !== npage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`?_start=${startIndex}&_limit=${recordsPerPage}`);
      navigate(`?page=${newPage}`);
    }
  };

  const handleNavId = (id: number) => {
    navigate(`/album/${id}`);
  };

  const tablebody = data.map((album: Albumtype) => (
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

export default AlbumsPage;
