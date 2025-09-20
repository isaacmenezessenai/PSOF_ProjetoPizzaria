import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
  container: {

    

    flex: 1,
    backgroundColor: colors.light,
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: colors.black,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.highlight,
  },
});
