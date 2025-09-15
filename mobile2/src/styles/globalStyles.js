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
    font-weight: ${typography.weights.neuehaasRoman};
    font-size: ${typography.sizes.body1};
  }

  bodyHighlight {
    margin: 0;
    padding: 0;
    background-color: ${colors.backgroundLight};
    color: ${colors.text};
    font-family: ${typography.fonts.primary};
    font-weight: ${typography.weights.neuehaasBold};
    font-size: ${typography.sizes.body1};
  }

  bigText {
    overflow: hidden;
color: #1A1F3F;
font-variant-numeric: lining-nums proportional-nums;
font-feature-settings: 'dlig' on;
text-overflow: ellipsis;
white-space: nowrap;
font-family: 'Chunko', sans-serif;
font-size: 80px;
font-style: normal;
font-weight: 400;
line-height: 0; /* 0% */
letter-spacing: 0.8px;
    }
`;

export default GlobalStyles;
