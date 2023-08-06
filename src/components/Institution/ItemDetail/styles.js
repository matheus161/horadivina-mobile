import { StyleSheet } from "react-native";
import colors from "../../../themes/colors";

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    //backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
  },
  infoAddress: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 13,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
  },
  detail: {
    fontSize: 14,
    color: colors.grey,
  },
});

export default styles;
