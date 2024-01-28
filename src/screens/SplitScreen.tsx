import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";

function SplitScreen() {
  const [personList, setPersonList] = useState([
    {
      name: "ME",
      color: "#948BFF",
      pressed: false,
      deletable: false,
    },
  ]);
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const addPerson = (name: string, color: string, pressed: boolean) => {
    setPersonList((prevList) => [
      ...prevList,
      {
        name: name,
        color: color,
        pressed: pressed,
        deletable: true,
      },
    ]);
  };
  const colors = [
    "#FFA68B",
    "#948BFF",
    "#BBEEAE",
    "#FFDE8B",
    "#8BE3FF",
    "#EEAEE7",
    "#FB8080",
  ];

  const handleAddPerson = () => {
    // TODO: Pass in random color
    if (nameInput == "") {
      return;
    }
    const randomIndex = Math.floor(Math.random() * colors.length);
    addPerson(nameInput, colors[randomIndex], false);
    setAddPersonModalOpen(false);
    setNameInput("");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topContainer, { backgroundColor: "#F64610" }]}>
        <Image
          style={[styles.img]}
          source={require("../assets/splitt-logo.png")}
          alt="Logo"
        />
      </View>
      <View style={[styles.bottomContainer, { backgroundColor: "#ffff" }]}>
        <Text style={styles.splitTitle}>split/IT</Text>
        <Text style={styles.splitDescription}>here's your reciept</Text>

        <View style={styles.personButtons}>
          {personList.map((person, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.squareAvatarFrame,
                { backgroundColor: person.color },
              ]}
            >
              <Text>
                {person.deletable ? person.name[0].toUpperCase() : "ME"}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => setAddPersonModalOpen(true)}
          >
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
          {addPersonModalOpen && (
            <>
              <Modal animationType="fade" transparent={true} visible={true}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setAddPersonModalOpen(false)}
                    >
                      <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>

                    <Text style={styles.modalHeader}>Add Member</Text>
                    <Text style={styles.modalText}>Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      onChangeText={(text) => setNameInput(text)}
                    />
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => handleAddPerson()}
                    >
                      <Text style={styles.saveButtonText}>Add person</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          )}

          <View style={styles.divider} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  squareAvatarFrame: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#4E4E4E",
    borderRadius: 5,
    margin: 5,
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
});

export default SplitScreen;
