import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const fetchCoursesFromDB = () => {

    return [
        { id: 1, name: 'Java' },
        { id: 2, name: 'OOP' },

    ];
};

export default function App() {
    const [courses, setCourses] = useState([]); // State to store courses from SQLite
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseMarks, setCourseMarks] = useState('');
    const [isCR, setIsCR] = useState(false);

    useEffect(() => {
        const fetchedCourses = fetchCoursesFromDB();
        setCourses(fetchedCourses);
    }, []);

    const handleSelectCourse = (courseId) => {
        setSelectedCourse(courseId);
    };

    const handleCheckboxChange = () => {
        setIsCR(!isCR);
    };

    const handleSelectButtonPress = () => {
        // Handle the action when the select button is pressed
        // This function can perform further actions with the selected course, marks, and checkbox value
        console.log('Selected Course:', selectedCourse);
        console.log('Course Marks:', courseMarks);
        console.log('Checkbox checked:', isCR);
        // Add your logic here
    };

    return (
        <View>

            <Text>Select Course:</Text>
            <Picker
                selectedValue={selectedCourse}
                onValueChange={(itemValue) => handleSelectCourse(itemValue)}
            >
                {courses.map((course) => (
                    <Picker.Item key={course.id} label={course.name} value={course.id} />
                ))}
            </Picker>

            <Text>Course Marks:</Text>
            <TextInput
                value={courseMarks}
                onChangeText={(text) => setCourseMarks(text)}
                keyboardType="numeric"
                placeholder="Enter marks"
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox value={isCR} onValueChange={handleCheckboxChange} />
                <Text>Is CR</Text>
            </View>

            <Button title="Select" onPress={handleSelectButtonPress} />
        </View>
    );
};


