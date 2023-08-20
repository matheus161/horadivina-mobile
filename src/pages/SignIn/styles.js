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
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.fontPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: colors.fontSecondary,
  },
  labelError: {
    alignSelf: "flex-start",
    color: colors.error,
    marginBottom: 8,
  },
});

export default styles;
