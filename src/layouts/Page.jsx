import Wrapper from "./Wrapper";
import Container from "./Container";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const Page = (props) => <>
  <Wrapper>
    <Container classes={["page", props.title.toLowerCase()]}>
      <Header title = { props.title }/>
      <Main>{ props.children }</Main>
      <Footer />
    </Container>
  </Wrapper>
</>

export default Page