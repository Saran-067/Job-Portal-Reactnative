import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Svg, { Path } from "react-native-svg"; // Import SVG components

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Dialog({ visible, onClose, children }: DialogProps) {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.dialogContainer}>
        {children}
        <Pressable style={styles.closeButton} onPress={onClose}>
          {/* Custom X Icon using react-native-svg */}
          <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
            <Path
              d="M18 6L6 18M6 6l12 12"
              stroke="white" // Use stroke to set the color
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      </View>
    </Modal>
  );
}

interface DialogTitleProps {
  children: React.ReactNode;
}

export const DialogTitle = ({ children }: DialogTitleProps) => (
  <Text style={styles.title}>{children}</Text>
);

interface DialogDescriptionProps {
  children: React.ReactNode;
}

export const DialogDescription = ({ children }: DialogDescriptionProps) => (
  <Text style={styles.description}>{children}</Text>
);

interface DialogTriggerProps {
  onPress: () => void;
  children: React.ReactNode;
}

export const DialogTrigger = ({ onPress, children }: DialogTriggerProps) => (
  <Pressable onPress={onPress} style={styles.trigger}>
    {children}
  </Pressable>
);

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  dialogContainer: {
    width: "80%",
    backgroundColor: "#222",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 8,
    textAlign: "center",
  },
  trigger: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
});