import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage'

const db = openDatabase(
    {
        name: 'productDB'
    }
)

export default function App() {
    const createTable = () => {
        db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))`,
                [],
                (sqlTxn, res) => {
                    console.log("table created successfully");
                },
                error => {
                    console.log("error on creating table " + error.message);
                },
            );
        });
    }
    function addProduct() {
        console.log('Add Product Called')
        //alert(productName)

        console.log('Add Product in progress')


        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO products (name) VALUES (?)`,
                [productName],
                (sqlTxn, res) => {
                    console.log(`${productName} product added successfully`);
                    fetchProducts();
                    resetValues();
                },
                error => {
                    console.log("error on adding product " + error.message);
                },
            )
        });

    }

    const fetchProducts = () => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM products ORDER BY id DESC`,
                [],
                (sqlTxn, res) => {
                    console.log("products retrieved successfully");
                    let len = res.rows.length;
                    let results = [];
                    if (len > 0) {

                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push({ id: item.id, name: item.name });
                        }


                    }
                    setProductsList(results);

                },
                error => {
                    console.log("error on getting products " + error.message);
                },
            );
        });
    }
    function SaveProduct() {
        if (!productName) {
            alert("Enter Product Name");
            return false;
        }
        if (buttonLabel === 'Add') {
            addProduct()
        } else {
            updateProduct()
        }
    }
    function editProduct({ item }) {
        console.log("id:", item.id)
        console.log("name:", item.name)

        setButtonLabel('Update');
        setProductId(item.id);
        setProductName(item.name)
    }
    function resetValues() {
        setButtonLabel('Add');
        setProductId(0);
        setProductName('');
    }
    function updateProduct() {

        db.transaction(txn => {
            txn.executeSql(
                `Update products set name=? where id=?`,
                [productName, productId],
                (sqlTxn, res) => {
                    console.log(`${productId} updated successfully`);
                    fetchProducts();
                    resetValues();

                },
                error => {
                    console.log("error on updating product " + error.message);
                },
            )
        });
    }
    function deleteProduct(id) {

        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM  products where id=?`,
                [id],
                (sqlTxn, res) => {
                    console.log(`${id} product id deleted successfully`);
                    fetchProducts();

                },
                error => {
                    console.log("error on adding product " + error.message);
                },
            )
        });
    }

    useEffect(() => {
        createTable()
        fetchProducts()
    }, []);



    const [productName, setProductName] = useState('')
    const [productsList, setProductsList] = useState([])
    const [buttonLabel, setButtonLabel] = useState('Add')
    const [productId, setProductId] = useState(0)

    return (
        <View style={styles.container}>
            <Text >
                Product Name:
            </Text>
            <TextInput value={productName} style={styles.input} onChangeText={newValue => setProductName(newValue)} />
            <Button title={buttonLabel} onPress={SaveProduct} />
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={productsList}
                renderItem={({ item }) => (
                    <View style={styles.item}>

                        <Text style={styles.text}>{item.name}</Text>
                        <TouchableOpacity onPress={() => editProduct({ item })}>
                            <Text style={{ backgroundColor: 'blue', fontSize: 20, width: 100, height: 30, margin: 2, borderRadius: 30, textAlign: 'center' }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteProduct(item.id)}>
                            <Text style={{ backgroundColor: 'red', fontSize: 20, width: 100, height: 30, margin: 2, borderRadius: 30, textAlign: 'center' }}>Delete</Text>
                        </TouchableOpacity>

                    </View>
                )}
            />
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        // paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    item: {
        margin: 10,
        backgroundColor: '#4ae1fa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 45,
        fontStyle: 'italic',
        margin: 10,
    },
    input: {
        backgroundColor: '#ddeeaa',
        height: 35,
        marginBottom: 5,
        borderRadius: 30,
    }
});