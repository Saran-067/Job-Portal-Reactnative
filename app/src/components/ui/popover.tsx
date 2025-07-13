import React, { useState, forwardRef } from "react";
import { Modal, View, Pressable, StyleSheet, Dimensions } from "react-native";

interface PopoverProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Popover = ({ visible, onClose, children }: PopoverProps) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose} />
      <View style={styles.popoverContent}>{children}</View>
    </Modal>
  );
};

interface PopoverTrigger {
  onPress: () => void;
  children: React.ReactNode;
}

// import React from 'react';

interface PopoverTrigger {
  children: React.ReactNode;
  asChild?: boolean; // Add asChild prop
}

// const PopoverTrigger: React.FC<PopoverTrigger> = ({ children, asChild }) => {
//   return asChild ? React.cloneElement(children) : <div>{children}</div>;
// };

export default PopoverTrigger;

interface PopoverContentProps {
  children: React.ReactNode;
}

export const PopoverContent = forwardRef<View, PopoverContentProps>(
  ({ children }, ref) => {
    return (
      <View ref={ref} style={styles.popoverContent}>
        {children}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popoverContent: {
    position: "absolute",
    top: Dimensions.get("window").height / 3,
    left: Dimensions.get("window").width / 6,
    width: 250,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
});
