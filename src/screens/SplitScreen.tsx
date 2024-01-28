import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import Divider from "../components/Divider";
import { styles } from "../styles/SplitScreen";
import Checkbox from "expo-checkbox";

type person = {
  name: string;
  color: string;
  pressed: boolean;
  deletable: boolean;
};

function getColor() {
  const colors = [
    "#FFA68B",
    "#948BFF",
    "#BBEEAE",
    "#FFDE8B",
    "#8BE3FF",
    "#EEAEE7",
    "#FB8080",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
function defaultPerson() {
  return [
    {
      name: "ME",
      color: "#948BFF",
      pressed: true,
      deletable: false,
    },
  ]
}
function SplitScreen() {
  const [personList, setPersonList] = useState(defaultPerson());
  const [items, setItems] = useState([
    {
      title: "2x Chicken Strips",
      price: 16.97,
      people: defaultPerson()
    },
    {
      title: "1x Cake",
      price: 16.97,
      people: defaultPerson()
    },
  ]);
  const [itemIndex, setItemIndex] = useState(0);
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [splitWithModalOpen, setSplitWithModalOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const addPerson = (name: string, color: string) => {
    setPersonList((prevList) => [
      ...prevList,
      {
        name: name,
        color: color,
        pressed: false,
        deletable: true,
      },
    ]);
    // Update all items to be in sync with personList
    setItems((prevItems) =>
    prevItems.map((item) => ({
      ...item,
      people: [...item.people, {
        name: name,
        color: color,
        pressed: false,
        deletable: true,
      }],
    }))
  );
  };

  const handleAddPerson = () => {
    if (nameInput == "") {
      return;
    }
    addPerson(nameInput, getColor());
    setAddPersonModalOpen(false);
    setNameInput("");
  };

  const handleCheckBox = (people: any) => {
    setChecked(!isChecked);
    people[itemIndex].pressed = !isChecked
    //person.pressed = !isChecked
    //person = personList
  };

  const handleSplitWithPress = (index: number, close: boolean) => {
    console.log("index")
    setSplitWithModalOpen(close)
    setItemIndex(index)
  }

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

        {/* People buttons */}
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
        </View>

        <Divider />

        {items.map((item, index) => (
          <View key={index} style={styles.recieptItemContainer}>
            <View style={styles.itemDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>

            <View style={styles.smallPersonButtons}>
              {item.people.map(
                (person, index) =>
                  person.pressed && (
                    <View
                      key={index}
                      style={[
                        styles.squareAvatarFrameSmall,
                        { backgroundColor: person.color },
                      ]}
                    >
                      <Text>
                        {person.deletable ? person.name[0].toUpperCase() : "ME"}
                      </Text>
                    </View>
                  )
              )}
              <TouchableOpacity onPress={() => handleSplitWithPress(index, true)}>
                <Text style={styles.plusButtonTextLight}>+</Text>
              </TouchableOpacity>
              {splitWithModalOpen && (
                <>
                  <Modal animationType="fade" transparent={true} visible={true}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => handleSplitWithPress(index, false)}
                        >
                          <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>

                        <Text style={styles.modalHeader}>Split With</Text>

                        <Divider />

                        {item.people.map((person, index) => (
                          <View
                            key={index}
                            style={[
                              {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingVertical: 20,
                                paddingHorizontal: 20,
                              },
                            ]}
                          >
                            <Checkbox
                              onValueChange={() => handleCheckBox(item.people)}
                              value={person.pressed}
                            />

                            <Text>{person.deletable ? person.name : "ME"}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </Modal>
                </>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default SplitScreen;
