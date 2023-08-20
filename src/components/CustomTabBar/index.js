import React from "react";
import { View, TouchableOpacity, Platform, Keyboard } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../../themes/colors";

import styles from "./styles";

export default function CustomTabBar({ state, descriptors, navigation }) {
  const [keyboardShow, setKeyboardShow] = React.useState();
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShow(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShow(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    !keyboardShow && (
      <View style={styles.container}>
        <View style={styles.content}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate({ name: route.name, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <View style={{ alignItems: "center", padding: 4 }}>
                  <View
                    style={[
                      styles.innerButtom,
                      {
                        backgroundColor: isFocused
                          ? colors.fontPrimary
                          : "transparent",
                      },
                    ]}
                  >
                    <Ionicons
                      name={options.tabBarIcon}
                      size={34}
                      color={isFocused ? colors.appFourthy : "#FFF"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    )
  );
}
