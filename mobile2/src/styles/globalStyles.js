import { createGlobalStyle } from "styled-components";
import colors from "./colors";
import typography from "./typography";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${colors.backgroundLight};
    color: ${colors.text};
    font-family: ${typography.fonts.primary};
    font-weight: ${typography.weights.chunkoNormal};
    font-size: ${typography.sizes.body1};
  }
`;

export default GlobalStyles;
