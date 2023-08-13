import { StyleSheet } from "react-native";
import colors from "../../../themes/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: "2%",
    marginBottom: "25%",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
  itemContainer: {
    //flex: 1,
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
  itemName: {
    fontWeight: "600",
    fontSize: 16,
  },
  itemLocal: {
    fontSize: 14,
    color: colors.grey,
  },
  emptyMessage: {
    fontWeight: "600",
    fontSize: 24,
  },
});

export default styles;
