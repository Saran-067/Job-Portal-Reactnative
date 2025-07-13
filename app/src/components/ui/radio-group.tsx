import React, { useState } from "react";
import { View } from "react-native";
import { RadioButton, Text } from "react-native-paper";

export default function App() {
  const [value, setValue] = useState("option1");

  return (
    <View>
      <RadioButton.Group onValueChange={setValue} value={value}>
        <View>
          <RadioButton.Item label="Option 1" value="option1" />
          <RadioButton.Item label="Option 2" value="option2" />
          <RadioButton.Item label="Option 3" value="option3" />
        </View>
      </RadioButton.Group>
    </View>
  );
}
