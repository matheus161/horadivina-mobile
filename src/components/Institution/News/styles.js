import { StyleSheet } from "react-native";
import colors from "../../../themes/colors";

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    padding: "2%",
    backgroundColor: "red",
    width: "100%",
    height: 275,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  title: {
    backgroundColor: "blue",
    height: 30,
    justifyContent: "center",
  },
  date: {
    backgroundColor: "white",
    height: 30,
    justifyContent: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
  bottomContainer: {
    position: "absolute", // Position the title and date at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    padding: 7,
  },
});

export default styles;
