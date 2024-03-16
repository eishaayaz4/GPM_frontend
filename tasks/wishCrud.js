import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Pressable, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage'

const db = openDatabase({
    name: 'tasks'
})

export default function App() {

    const createTable = () => {
        db.transaction(txn => {
            txn.executeSql(
                `Create table wishes (id integer Primary key autoIncrement , name varchar(20))`, [],
                (sqltxn, res) => {
                    console.log("Table created successfully...")
                },
                error => {
                    console.log("error on creating table")
                },
            );
        });
    }
    function insertWish() {
        db.transaction(txn => {
            txn.executeSql(
                `insert into wishes (name) values(?)`,
                [wish],
                (sqltxn, res) => {
                    console.log("Successfully inserted")
                },
                error => {
                    console.log("Error in insertion")
                },

            );
        });
    }
    function fetchWish() {
        db.transaction(txn => {
            txn.executeSql(
                `select * from wishes`, [],
                (sqltxn, res) => {
                    console.log("records retrieved");
                    let len = res.rows.length;
                    let list = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i)
                            list.push({ id: item.id, name: item.name })
                        }
                    }
                    setWishList(list);
                },
                error => {
                    console.log("error in fetching records"
                }
            )
        })
    }
    useEffect(() => {
        //   createTable(),

    })
    const [wish, setWish] = useState('');
    const [wishList, setWishList] = useState([]);
    return (
        <View style={styles.container}>
            <Text style={{ padding: 20, fontWeight: 'bold', fontFamily: 'poppins', backgroundColor: 'yellow', fontSize: 20 }}>Wishes can come true</Text>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontFamily: 'poppins', fontWeight: 'bold', margin: 15, padding: 3 }}>
                    Your Wish :
                </Text>
                <TextInput value={wish} onChangeText={newVal => setWish(newVal)} style={{ borderWidth: 1, borderRadius: 3, margin: 15 }} />
                <Pressable onPress={insertWish} style={{ backgroundColor: 'skyblue', borderRadius: 40, padding: 5, marginLeft: 90, marginRight: 90 }}>
                    <Text style={{ fontFamily: 'poppins', padding: 4, marginLeft: 80, fontWeight: 'bold', fontSize: 16 }}>
                        Add
                    </Text>

                </Pressable>
                <Pressable style={{ backgroundColor: 'skyblue', borderRadius: 40, padding: 5, marginLeft: 90, marginRight: 90, marginTop: 10 }}>
                    <Text style={{ fontFamily: 'poppins', padding: 4, marginLeft: 80, fontWeight: 'bold', fontSize: 16 }}>
                        Update
                    </Text>

                </Pressable>
            </View>
            <View style={styles.item}>
                {fetchWish()}
                <FlatList data={wishList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (

                        <Text style={styles.text}>{item.name}</Text>
                    )} />


            </View>

        </View>
    );


}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    }
    , item: {
        margin: 10,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {

        fontSize: 17,
        fontStyle: 'italic',
        margin: 10,
    }
});