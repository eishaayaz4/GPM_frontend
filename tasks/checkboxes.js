import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';

const initialState = {
    react: false,
    next: false,
    vue: false,
    angular: false,
};

export default function App() {
    const [state, setState] = useState(initialState);
    const [toggleButton, setToggleButton] = useState(false);
    const [gender, setGender] = useState('male')

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <Text>Select Gender</Text>
                    <RadioButton.Group onValueChange={val => setGender(val)} value={gender}>
                        <RadioButton.Item label="male" value='male'></RadioButton.Item>
                        <RadioButton.Item label="female" value='female'></RadioButton.Item>
                    </RadioButton.Group>
                    <View style={styles.checkboxWrapper}>
                        <CheckBox
                            value={state.react}
                            onValueChange={(value) =>
                                setState((prevState) => ({ ...prevState, react: value }))
                            }
                        />
                        <Text>React js</Text>
                    </View>
                    <View style={styles.checkboxWrapper}>
                        <CheckBox
                            value={state.next}
                            onValueChange={(value) =>
                                setState((prevState) => ({ ...prevState, next: value }))
                            }
                        />
                        <Text>Next js</Text>
                    </View>
                    <View style={styles.checkboxWrapper}>
                        <CheckBox
                            value={state.vue}
                            onValueChange={(value) =>
                                setState((prevState) => ({ ...prevState, vue: value }))
                            }
                        />
                        <Text>Vue js</Text>
                    </View>
                    <View style={styles.checkboxWrapper}>
                        <CheckBox
                            value={state.angular}
                            onValueChange={(value) =>
                                setState((prevState) => ({ ...prevState, angular: value }))
                            }
                        />
                        <Text>Angular js</Text>
                    </View>
                </View>
                <Button
                    onPress={() => setToggleButton((prev) => !prev)}
                    title="Save"
                />
            </View>
            {toggleButton && (
                <View style={styles.resultContainer}>
                    {Object.entries(state).map(([key, value]) => {
                        return (
                            value && (
                                <View key={key} style={{ paddingHorizontal: 5 }}>
                                    <Text>{key}</Text>
                                </View>
                            )
                        );
                    })}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    resultContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    checkboxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        width: 80,
        height: 80,
    },
});
