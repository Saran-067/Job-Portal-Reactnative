import React, { forwardRef } from "react";
import { Text, StyleSheet, TextProps } from "react-native";

interface LabelProps extends TextProps {
  className?: string; // Placeholder for utility styles
}

export const Label = forwardRef<Text, LabelProps>(({ style, ...props }, ref) => {
  return <Text ref={ref} style={[styles.label, style]} {...props} />;
});

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    opacity: 1,
  },
});
