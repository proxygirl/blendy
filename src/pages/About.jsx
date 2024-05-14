import Page from "../layouts/Page";
import Navigation from "../layouts/Navigation";

const About = () => <>
  <Page title = "About">
    <div>
      <p>A project 2 years in the making, blendy is a procedurally generated puzzle game based off of the mobile game Blendoku.</p>
      <p>Special thanks to Chloe, Drew, and Eddy's nieces for all of their help playtesting early versions of the game.</p>
      <h3>Built With</h3>
      <ul>
        <li>♥ <a href="https://colorjs.io">Color.js</a></li>
        <li>♥ <a href="https://chancejs.com">Chance</a></li>
        <li>♥ <a href="https://ajv.js.org">Ajv</a></li>
      </ul>
      </div>      
    <Navigation />
  </Page>
</>

export default About