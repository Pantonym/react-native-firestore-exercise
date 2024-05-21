import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const DetailsScreen = ({ route, navigation }) => {

  const { title, description, due, priority, completed, itemID } = route.params;
  const [completedOutput, setCompletedOutput] = useState(completed);

  const handleMarkCompleted = async () => {
    const completedRef = doc(db, "items", itemID);
    console.log("Ref: ", completedRef)
    console.log('itemID: ', itemID)

    // Set the "capital" field of the city 'DC'
    await updateDoc(completedRef, {
      isCompleted: true
    });

    console.log("Successfully marked ", itemID, " as complete.");
    setCompletedOutput(true);
  }

  const handleDelete = async () => {
    await deleteDoc(doc(db, "items", itemID));
    console.log('Item successfully deleted with id: ', itemID);

    navigation.goBack()
  }

  const confirmDelete = () => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: handleDelete,
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>{title}</Text>
      <Text>Description: {description}</Text>
      <Text> Due Date: {due}</Text>

      {priority ? (
        <Text>Priority: Yes</Text>
      ) : (
        <Text>Priority: No</Text>
      )}

      {completedOutput ? (
        <Button
          title='already done'
          color="red"
          disabled={true}
        />
      ) : (
        <Button
          title='mark completed'
          color="red"
          disabled={false}
          onPress={handleMarkCompleted}
        />
      )}

      <Button
        title='Delete Item'
        color='red'
        disabled={false}
        onPress={confirmDelete}
      />
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
    marginTop: 20,
  }
})