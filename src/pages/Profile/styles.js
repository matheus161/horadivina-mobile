import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appPrimary,
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    marginStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.fontPrimary,
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    justifyContent: "center",
  },
  containerContent: {
    width: "100%",
    height: 20,
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  botton: {
    height: 80,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  scrollView: {
    flex: 1,
    padding: "2%",
    marginBottom: "25%",
  },
});

export default styles;
