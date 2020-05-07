import { Container } from "semantic-ui-react";

// const PageContainer = styled(Container).attrs((props) => ({ text: true }))`
//   margin-top: 1em;
//   margin-bottom: 1em;
// `;

const PageContainer = (props) => (
  <Container text style={{ marginTop: "1em", marginBottom: "1em" }}>
    {props.children}
  </Container>
);

export default PageContainer;
