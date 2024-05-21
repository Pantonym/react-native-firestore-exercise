import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { getMyBucketList } from '../services/DbService';
import { useFocusEffect } from '@react-navigation/native';

const ListScreen = ({ navigation }) => {

    const goToAdd = () => { navigation.navigate("Add") }

    const [bucketItems, setBucketItems] = useState([])

    // useEffect(() => { // only running on first load, but when navigating back it doesn't re-render
    //     handleGettingOfData()
    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            // Do something when the screen is focused
            handleGettingOfData()

            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup operations

                // Do Nothing
            };
        }, [])
    );

    const handleGettingOfData = async () => {
        var allData = await getMyBucketList()
        // console.log("All Data: " + allData)

        setBucketItems(allData)
    }

    return (
        // OPTIONAL - Drag to reload the list
        <SafeAreaView>
            <View style={styles.container}>

                <Pressable style={styles.addButton} onPress={goToAdd}>
                    <Text style={styles.addButtonText}>Add</Text>
                    <Entypo name="bucket" size={16} color="green" />
                </Pressable>

                <ScrollView>
                    {/* THIS WILL LOOP FOR EACH ITEM - use a scrollview or flatlist, and you need to know why you selected which one */}
                    {
                        bucketItems.length > 0 ? (
                            bucketItems.map((item, index) => (
                                <TouchableOpacity key={index} style={styles.card} onPress={() => navigation.navigate("Details", {
                                    title: item.title,
                                    description: item.description,
                                    due: item.due,
                                    priority: item.priority,
                                    completed: item.isCompleted,
                                    itemID: item.id
                                })}>
                                    <Text style={item.isCompleted ? styles.completedText : null}>
                                        {item.title}
                                    </Text>
                                    {item.priority ? <AntDesign name="star" size={24} color="orange" /> : null}
                                    {/* show the star if it is a priority */}
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text>No Items Found Yet</Text>
                        )
                    }
                    {/* END LOOP */}
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default ListScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    card: {
        width: '100%',
        backgroundColor: 'white',
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    addButton: {
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 2,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    addButtonText: {
        textAlign: 'center',
        color: 'green',
        fontWeight: 'bold'
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'gray'
    }
})