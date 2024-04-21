import { Link, Outlet } from "react-router-dom";
import "../style.css"

function App() {
  return (
    <>
      <nav>
        <Link className="a" to={"/"}>Home</Link>
        <Link className="a" to={"/about"}>about</Link>
      </nav>
      <Outlet/>
    </>
  );
}

export default App;
