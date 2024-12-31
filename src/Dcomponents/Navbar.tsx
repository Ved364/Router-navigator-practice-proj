import { useNavigate } from "react-router-dom";

// type Props = {
//   nname: string;
//   nLink: string;
// };
const Navbar = () => {
  const navigate = useNavigate();
  const buttons = [
    { names: "Ved", nLink: "/user" },
    { names: "Jayachandra", nLink: "/user" },
  ];

  //   const rowsDisplay = () => {
  //     navigate(`/dhanu/${id}`);
  //   };
  //   const userPage = () => {
  //     navigate("/");
  //   };
  return (
    <>
      <div className="nav-bar">
        <div>
          <button className="back-btn">Go Back</button>
        </div>
        <div className="nav-btn1">
          {buttons.map((b) => (
            <button className="btn" onClick={() => navigate(b.nLink)}>
              {b.names}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
