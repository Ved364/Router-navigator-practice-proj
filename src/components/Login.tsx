import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetItem from "./GetItem";

type FormEvent = React.FormEvent<HTMLFormElement>;

type User = {
  email: string;
  password: string;
};

const Login = () => {
  const [, setLogin] = useState<boolean>(false);
  const [, setData] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(GetItem());
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    if (email && password) {
      const users = GetItem();
      for (const val of users) {
        if (val.email.includes(email)) {
          setLogin(true);
          if (val.email === email && val.password === password) {
            localStorage.setItem("currentUser", JSON.stringify(val));
            navigate("/");
          } else if (val.email !== email) {
            alert(`${email} does not exist`);
          } else {
            alert("Password is incorrect");
          }
          return;
        }
      }
      alert("User doesnot exist. Please Signup.");
    }
  };
  return (
    <div className="loginPageBackground">
      <div className="loginContainer">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                required
                placeholder="Username"
              />
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
              />
            </div>
            <div className="inputBox">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
