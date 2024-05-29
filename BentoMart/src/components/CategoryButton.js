import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryButton ({ title }) {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50, 
    borderWidth: 1,
    borderColor: '#d91319',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#d91319',
    // fontWeight: 'bold',
  },
});

