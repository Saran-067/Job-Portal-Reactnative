import React from "react";
import { Text, View, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline";
  children: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge: React.FC<BadgeProps> = ({ variant = "default", children, style, textStyle }) => {
  return (
    <View style={[styles.badge, variantStyles[variant], style]}>
      <Text style={[styles.text, textStyles[variant], textStyle]}>{children}</Text>
    </View>
  );
};

// Base styles for the badge
const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});

// Variant styles for background and border
const variantStyles = StyleSheet.create({
  default: { backgroundColor: "#007bff", borderColor: "transparent" },
  secondary: { backgroundColor: "#6c757d", borderColor: "transparent" },
  destructive: { backgroundColor: "#dc3545", borderColor: "transparent" },
  outline: { backgroundColor: "transparent", borderColor: "#333" },
});

// Text color based on variant
const textStyles = StyleSheet.create({
  default: { color: "#ffffff" },
  secondary: { color: "#ffffff" },
  destructive: { color: "#ffffff" },
  outline: { color: "#333" },
});

export default Badge;
