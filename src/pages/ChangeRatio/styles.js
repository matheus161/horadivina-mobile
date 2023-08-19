import { StyleSheet } from "react-native";
import colors from "../../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appPrimary,
  },
  containerHeader: {
    flexDirection: "row",
    marginTop: "14%", // Deixar menos para baixo
    marginBottom: "8%",
    marginStart: "5%",
    alignItems: "center",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.fontPrimary,
    marginLeft: 10,
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.appPrimary,
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    alignItems: "center",
  },
  buttonText: {
    color: colors.fontPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  labelError: {
    alignSelf: "flex-start",
    color: colors.error,
    marginBottom: 8,
  },
  slider: {
    width: "100%",
  },
  ratioText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: "5%",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
    marginTop: 24,
  },
  ratioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;