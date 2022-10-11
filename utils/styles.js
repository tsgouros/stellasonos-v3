import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const ContainerStyles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ButtonStyles = StyleSheet.create({
  blackButton: {
    backgroundColor: "#111",
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
  },
});

export const TextStyles = StyleSheet.create({
  blackText: {
    fontSize: 18,
    color: "#111",
    justifyContent: 'center',
    textAlign: 'center',
    maxWidth: '80%',
  },

  whiteText: {
    fontSize: 18,
    color: '#fff',
  },
});