import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const { width, height } = Dimensions.get('window');

const CheckboxWithSubCheckboxes = () => {
  const [mainCheckboxes, setMainCheckboxes] = useState([
    {
      id: 1, title: 'Cleaning interior', checked: false, subCheckboxes: [
        { id: 117, name: 'suv', checked: true },
        { id: 118, name: 'hatchback', checked: false },
        { id: 119, name: 'luxury', checked: false },
        { id: 120, name: 'sedan', checked: false }
      ]
    },
    {
      id: 2, title: 'Car body wash', checked: false, subCheckboxes: [
        { id: 129, name: 'suv', checked: true },
        { id: 130, name: 'luxury', checked: false },
        { id: 131, name: 'sedan', checked: false }
      ]
    },
    {
      id: 3, title: 'Testing1', checked: false, subCheckboxes: [
        { id: 139, name: 'Test 1', checked: true },
        { id: 140, name: 'Test 2', checked: false },
        { id: 141, name: 'Test 3', checked: false },
        { id: 142, name: 'Test 4', checked: false }
      ]
    },
    {
      id: 4, title: 'Testing2', checked: false, subCheckboxes: [
        { id: 150, name: 'Test 1', checked: true },
        { id: 151, name: 'Test 2', checked: false },
        { id: 152, name: 'Test 3', checked: false },
        { id: 153, name: 'Test 4', checked: false }
      ]
    },
    {
      id: 5, title: 'Testing3', checked: false, subCheckboxes: [
        { id: 161, name: 'Test3', checked: true },
        { id: 162, name: 'Test4', checked: false }
      ]
    },
  ]);

  const handleMainCheckboxChange = (index) => {
    const updatedMainCheckboxes = [...mainCheckboxes];
    updatedMainCheckboxes[index].checked = !updatedMainCheckboxes[index].checked;
    setMainCheckboxes(updatedMainCheckboxes);
  };

  const handleSubCheckboxChange = (mainIndex, subIndex) => {
    const updatedMainCheckboxes = [...mainCheckboxes];
    updatedMainCheckboxes[mainIndex].subCheckboxes[subIndex].checked = !updatedMainCheckboxes[mainIndex].subCheckboxes[subIndex].checked;
    setMainCheckboxes(updatedMainCheckboxes);
  };

  const handleSubmit = () => {
    const selectedCheckboxes = [];
    mainCheckboxes.forEach((mainCheckbox) => {
      if (mainCheckbox.checked) {
        const subCheckboxes = [];

        mainCheckbox.subCheckboxes.forEach((subCheckbox) => {
          if (subCheckbox.checked) {
            subCheckboxes.push({ id: subCheckbox.id, name: subCheckbox.name });
          }
        });

        selectedCheckboxes.push({ id: mainCheckbox.id, title: mainCheckbox.title, subCheckboxes });
      }
    });

    console.log(selectedCheckboxes);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ with: "100%" }} showsVerticalScrollIndicator={false}>
        {mainCheckboxes.map((mainCheckbox, mainIndex) => (
          <View key={mainCheckbox.id}>

            <View style={{ marginVertical: 5, flexDirection: "row", alignItems: "center" }}>
              <CheckBox
                tintColors={{ true: '#0e5ee8', false: '#0e5ee8' }}
                value={mainCheckbox.checked}
                onValueChange={() => handleMainCheckboxChange(mainIndex)}
              />
              <Text style={styles.mainText}>{mainCheckbox.title}</Text>
            </View>


            {mainCheckbox.checked && (
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {mainCheckbox.subCheckboxes.map((subCheckbox, subIndex) => (
                  <View key={subCheckbox.id} style={{ flexDirection: "row", alignItems: "center" }}>
                    <CheckBox
                      tintColors={{ true: '#0e5ee8', false: '#0e5ee8' }}
                      value={subCheckbox.checked}
                      onValueChange={() => handleSubCheckboxChange(mainIndex, subIndex)}
                    />
                    <Text style={styles.subText}>{subCheckbox.name}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.submitTouch} onPress={handleSubmit} >
          <Text style={styles.submitText}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20
  },
  submitText: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "800"
  },
  submitTouch: {
    backgroundColor: "#0e5ee8",
    height: height / 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  subText: {
    fontSize: 13,
    color: "#000",
  },
  mainText: {
    fontSize: 16,
    color: "#000",
  }
});


export default CheckboxWithSubCheckboxes;      
