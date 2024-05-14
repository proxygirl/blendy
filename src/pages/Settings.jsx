import { Link } from "react-router-dom";

import Page from "../layouts/Page";

const Settings = () => <>
  <Page title = "Settings">
    <ul className="menu">
      <li className="menu-item">
        <Link to={`/`}>Back</Link>
      </li>
    </ul>
  </Page>
</>

export default Settings