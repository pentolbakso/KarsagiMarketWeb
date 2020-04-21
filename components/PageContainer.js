import { Container } from "semantic-ui-react";
import styled from "styled-components";

const PageContainer = styled(Container).attrs((props) => ({ text: true }))`
  margin-top: 1em;
`;

export default PageContainer;
