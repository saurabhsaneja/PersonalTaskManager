import React, { useState } from "react";
import {
  View,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { getFont } from "../helpers/helper";

const DropdownPicker = ({
  value,
  setValue,
  data,
  placeholder,
  isCallFunc = false,
  callFunc = () => { },
  isCustomIsFocus = false,
  customIsFocus = () => { },
  style = {},
  isSearch = false,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <Dropdown
        //   style={[styles.dropdown, style, isFocus && { borderColor: 'green' }]}
        style={[styles.dropdown, style]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={isSearch}
        maxHeight={300}
        labelField="label"
        valueField="value"
        //   placeholder={!isFocus ? placeholder : '...'}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => {
          if (isCustomIsFocus) {
            customIsFocus();
          }
          setIsFocus(true);
        }}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          if (isCallFunc) {
            callFunc(item.value);
          } else {
            setValue(item.value);
          }
          setIsFocus(false);
        }}
      />
    </>
  );
};

export default DropdownPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 45,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 25,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 5,
    // backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 18,
  },
  placeholderStyle: {
    fontSize: 18,
    color: "grey",
    fontWeight: "400",
  },
  selectedTextStyle: {
    fontSize: 18,
    color: "#353334",
    fontWeight: "400",
  },
  itemTextStyle: {
    fontSize: 18,
    color: "#353334",
    fontWeight: "400",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#353334",
    fontWeight: "400",
  },
  fieldHeadnig: {
    color: "#525252",
    fontSize: 14,
    fontFamily: getFont('Regular'),
    alignSelf: "baseline",
  },
  star: {
    color: "#A41010",
  },
});
