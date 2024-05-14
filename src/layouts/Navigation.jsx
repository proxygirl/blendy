import { Link } from "react-router-dom";

const Navigation = () => {

  return <>
    <ul className="menu">
      <li className="menu-item">
        <Link to={`/`}>Back</Link>
      </li>
    </ul>
  </>

}

export default Navigation