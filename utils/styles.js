import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const ContainerStyles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  defaultCard: {
    flex: 1,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
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
  blackTextSmall: {
    fontSize: 18,
    color: "#111",
    justifyContent: 'center',
    textAlign: 'center',
    maxWidth: '80%',
    backgroundColor: "transparent"
  },

  blackTextLarge: {
    fontSize: 50,
    color: "#111",
    justifyContent: 'center',
    textAlign: "center",
    backgroundColor: "transparent"
  },

  whiteTextSmall: {
    fontSize: 18,
    color: '#fff',
  },
});