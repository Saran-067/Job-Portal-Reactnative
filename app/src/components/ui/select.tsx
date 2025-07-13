import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, options, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select an option:</Text>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={options}
        value={value}
        placeholder={{ label: placeholder || "Choose an option...", value: null }}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
          placeholder: styles.placeholder,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  placeholder: {
    color: "#999",
  },
});

export default Select;
