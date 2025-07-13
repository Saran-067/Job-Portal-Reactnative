import React, { forwardRef } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  className?: string; // Placeholder for utility styles
}

export const Input = forwardRef<TextInput, InputProps>(({ style, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      style={[styles.input, style]}
      placeholderTextColor="#999"
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#000",
  },
});
