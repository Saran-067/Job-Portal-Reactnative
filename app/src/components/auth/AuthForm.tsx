import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';

interface AuthFormProps {
  fields: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad' | 'decimal-pad' | 'url' | 'web-search';
  }[];
  onSubmit: () => void;
  submitText: string;
  loading: boolean;
  footerText: string;
  onFooterPress: () => void;
  onFileUpload?: () => void;
  fileUri?: string | null; // ✅ Properly typed
}

const AuthForm: React.FC<AuthFormProps> = ({
  fields,
  onSubmit,
  submitText,
  loading,
  footerText,
  onFooterPress,
  onFileUpload,
  fileUri,
}) => {
  return (
    <View>
      {fields.map((field, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={field.onChangeText}
            placeholder={field.placeholder}
            secureTextEntry={field.secureTextEntry}
            keyboardType={field.keyboardType}
          />
        </View>
      ))}

      {/* File Upload */}
      {onFileUpload && (
        <TouchableOpacity onPress={onFileUpload} style={styles.uploadButton}>
          <Text>Upload Profile Picture</Text>
          {fileUri && <Image source={{ uri: fileUri }} style={styles.image} />}
        </TouchableOpacity>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{submitText}</Text>
        )}
      </TouchableOpacity>

      {/* Footer Link */}
      <TouchableOpacity onPress={onFooterPress} style={styles.footerLink}>
        <Text style={styles.linkText}>{footerText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  uploadButton: {
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerLink: {
    marginTop: 20,
  },
  linkText: {
    textAlign: 'center',
    color: '#0000ff',
  },
});

export default AuthForm;