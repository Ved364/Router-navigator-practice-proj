import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type albumtype = { userId: number; id: number; title: string };
const AlbumId = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState<albumtype | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((res) => {
        setAlbum(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  if (!album) {
    return <div>Album Not Found ..!</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </button>
      </div>
      <table className="user-id-table">
        <thead>
          <tr>
            <th>USERID</th>
            <th>ID</th>
            <th>TITLE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{album.userId}</td>
            <td>{album.id}</td>
            <td>{album.title}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default AlbumId;
