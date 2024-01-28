import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "#F64610",
    },
    topContainer: {
      width: "100%",
      height: "20%",
      justifyContent: "center",
      alignItems: "center",
    },
    bottomContainer: {
      width: "94%",
      height: "80%",
      alignItems: "center",
    },
    img: {
      marginTop: 30,
      width: "55%",
      objectFit: "contain",
    },
    splitTitle: {
      fontSize: 24,
      color: "#F64610",
      fontWeight: "bold",
      paddingTop: 20,
      paddingBottom: 10,
    },
    splitDescription: {
      fontSize: 16,
      color: "#F64610",
      paddingBottom: 20,
    },
    personButtons: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    smallPersonButtons: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      width: '50%'
    },
    squareAvatarFrame: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: "#4E4E4E",
      borderRadius: 5,
      margin: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    squareAvatarFrameSmall: {
      width: 35,
      height: 35,
      borderWidth: 1,
      borderColor: "#4E4E4E",
      borderRadius: 5,
      margin: 3,
      alignItems: "center",
      justifyContent: "center",
    },
    plusButton: {
      width: 50,
      height: 50,
      backgroundColor: "#EEEEEF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
      margin: 5,
      borderWidth: 1,
      borderColor: "#4E4E4E",
    },
    plusButtonText: {
      fontSize: 24,
      color: "#585050",
    },
    plusButtonTextLight: {
      fontSize: 24,
      color: "#4E4E4E",
      margin: 5,
    },
    modalContainer: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "relative",
      justifyContent: "flex-end", // Align modal container to the bottom
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: "100%",
      height: "60%",
    },
    modalHeader: {
      fontSize: 24,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      paddingVertical: 10,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    saveButton: {
      backgroundColor: "#EEEEEF",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#4E4E4E",
    },
    saveButtonText: {
      color: "#585050",
      fontSize: 16,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      marginVertical: 10, // Adjust vertical spacing as needed
    },
    menu: {
      position: "absolute",
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      zIndex: 1,
    },
    menuItem: {
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
      padding: 10,
    },
    closeButtonText: {
      fontSize: 18,
      color: "black",
    },
    recieptItemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 20,
      width: '88%',
    },
    itemDetails: {
      flex: 1,
      marginRight: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
    },
    price: {
      fontSize: 14,
      color: "#666",
    },
    selectBox: {
      width: '80%',
      height: 40,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 10,
    },
  });
  