import { useState, useEffect } from "react";
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
  ];
}

function SplitCheckbox({ items, setItems, itemIndex, personIndex }: any) {
  const [isChecked, setChecked] = useState<boolean>(
    items[itemIndex].people[personIndex].pressed
  );

  const handleCheckBox = () => {
    setChecked((currentChecked) => !currentChecked);

    setItems((currentItems: any) =>
      currentItems.map((item: any, idx: number) =>
        idx === itemIndex
          ? {
              ...item,
              people: item.people.map((person: any, pIdx: number) =>
                pIdx === personIndex
                  ? { ...person, pressed: !isChecked }
                  : person
              ),
            }
          : item
      )
    );
    console.log(items[1].people);
  };

  return (
    <Checkbox
      onValueChange={handleCheckBox}
      value={items[itemIndex].people[personIndex].pressed}
    />
  );
}

function SplitScreen() {
  const [personList, setPersonList] = useState(defaultPerson());
  const [items, setItems] = useState([
    {
      title: "2x Chicken Strips",
      price: 16.97,
      people: defaultPerson(),
    },
    {
      title: "1x Cake",
      price: 16.97,
      people: defaultPerson(),
    },
  ]);
  const [addPersonModalOpen, setAddPersonModalOpen] = useState(false);
  const [splitWithModalOpen, setSplitWithModalOpen] = useState(false);
  const [avatarFrameModalOpen, setAvatarFrameModalOpen] = useState(false);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
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
        people: [
          ...item.people,
          {
            name: name,
            color: color,
            pressed: false,
            deletable: true,
          },
        ],
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

  const handleSplitWithPress = (index: number, close: boolean) => {
    setSplitWithModalOpen(close);
    setCurrentItemIndex(index);
  };

  const getRecieptInfoFromUser = (name: string) => {
    console.log(name)
    const itemList: any = [];
    let totalCost = 0;

    items.forEach((item) => {
      if (item.people.some((person) => (person.name === name) && (person.pressed))) {
        itemList.push(item);
        totalCost += item.price;
      }
    });

    return { itemList, totalCost };
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

        {/* People buttons */}
        <View style={styles.personButtons}>
          {personList.map((person, index) => (
            <>
              <TouchableOpacity
                key={index}
                style={[
                  styles.squareAvatarFrame,
                  { backgroundColor: person.color },
                ]}
                onPress={() => setAvatarFrameModalOpen(true)}
              >
                <Text>
                  {person.deletable ? person.name[0].toUpperCase() : "ME"}
                </Text>
              </TouchableOpacity>
              {avatarFrameModalOpen && (
                <>
                  <Modal animationType="fade" transparent={true} visible={true}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => setAvatarFrameModalOpen(false)}
                        >
                          <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>

                        <Text style={styles.modalHeader}>{person.name}</Text>
                        <Divider />
                        <>
                          {getRecieptInfoFromUser(person.name).itemList.map(
                            (item: any, index: number) => (
                              <View key={index} style={styles.recieptDetail}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.price}>${item.price}</Text>
                              </View>
                            )
                          )}
                          <Divider />

                          <View key={index} style={styles.recieptDetail}>
                            <Text style={styles.title}>Subtotal</Text>
                            <Text style={styles.price}>
                              ${(getRecieptInfoFromUser(person.name).totalCost).toFixed(2)}
                            </Text>
                          </View>

                          <View key={index} style={styles.recieptDetail}>
                            <Text style={styles.title}>Tax</Text>
                            <Text style={styles.price}>
                              $
                              {(getRecieptInfoFromUser(person.name).totalCost *
                                0.15).toFixed(2)}
                            </Text>
                          </View>

                          <View key={index} style={styles.recieptDetail}>
                            <Text style={styles.title}>Tip</Text>
                            <Text style={styles.price}>
                              $
                              {(getRecieptInfoFromUser(person.name).totalCost *
                                0.18).toFixed(2)}
                            </Text>
                          </View>

                          <View key={index} style={styles.recieptDetail}>
                            <Text style={styles.title}>Total</Text>
                            <Text style={styles.price}>
                              $
                              {(getRecieptInfoFromUser(person.name).totalCost +
                                getRecieptInfoFromUser(person.name).totalCost *
                                  0.15 +
                                getRecieptInfoFromUser(person.name).totalCost *
                                  0.18).toFixed(2)}{" "}
                            </Text>
                          </View>
                        </>
                      </View>
                    </View>
                  </Modal>
                </>
              )}
            </>
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

        {items.map((item, itemIndex) => (
          <View key={itemIndex} style={styles.recieptItemContainer}>
            <View style={styles.itemDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>

            <View style={styles.smallPersonButtons}>
              {item.people.map(
                (person, personIndex) =>
                  person.pressed && (
                    <View
                      key={personIndex}
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
              <TouchableOpacity
                onPress={() => handleSplitWithPress(itemIndex, true)}
              >
                <Text style={styles.plusButtonTextLight}>+</Text>
              </TouchableOpacity>
              {splitWithModalOpen && (
                <>
                  <Modal animationType="fade" transparent={true} visible={true}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => handleSplitWithPress(itemIndex, false)}
                        >
                          <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>

                        <Text style={styles.modalHeader}>Split With</Text>

                        <Divider />

                        {item.people.map((person, personIndex) => (
                          <View
                            key={personIndex}
                            style={[
                              {
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingVertical: 20,
                                paddingHorizontal: 20,
                              },
                            ]}
                          >
                            <SplitCheckbox
                              items={items}
                              setItems={setItems}
                              itemIndex={currentItemIndex}
                              personIndex={personIndex}
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
