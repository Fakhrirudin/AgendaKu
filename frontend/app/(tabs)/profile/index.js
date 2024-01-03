import { Image, StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from "react-native-chart-kit";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const index = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      router.replace("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // const fetchTaskData = async () => {
  //   try {
  //     const userId = await AsyncStorage.getItem("UserId");
  
  //     if (!userId) {
  //       console.error("User id not available.");
  //       return;
  //     }
  
  //     const response = await axios.get(`http://192.168.100.20:3000/users/${userId}/todos/count`);
  //     const { totalCompletedTodos, totalPendingTodos } = response.data;
  //     setCompletedTasks(totalCompletedTodos);
  //     setPendingTasks(totalPendingTodos);
  //   } catch (error) {
  //     console.log("Error fetching task data:", error);
  //   }
  // };
  

  // useEffect(() => {
  //   fetchTaskData();
  // }, []);

  // console.log("comp", completedTasks);
  // console.log("pending", pendingTasks);

  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
          }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>This is your Profile</Text>
          </View>
          <Pressable onPress={handleLogout} style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 12,
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "red", marginRight:2 }}>Logout</Text>
            <MaterialCommunityIcons name="logout" size={18} color="red" />
          </Pressable>
      </View>
      <View style={{ marginVertical: 12 }}>
        <Text>Tasks Overview</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginVertical: 8 }}>
          <View style={{
            backgroundColor: "#89cff0",
            padding: 10,
            borderRadius: 8,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>{completedTasks}</Text>
            <Text style={{ marginTop: 4 }}>Completed Tasks</Text>
          </View>

          <View style={{
            backgroundColor: "#89cff0",
            padding: 10,
            borderRadius: 8,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>{pendingTasks}</Text>
            <Text style={{ marginTop: 4 }}>Pending Tasks</Text>
          </View>
        </View>
      </View>

      <LineChart
        data={{
          labels: ["Pending Tasks", "Completed Tasks"],
          datasets: [
            {
              data: [pendingTasks, completedTasks],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        yAxisInterval={2} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />

      <View style={{ backgroundColor: "#89CFF0", padding: 10, borderRadius: 6, marginTop: 15 }}>
        <Text style={{ textAlign: "center", color: "white" }}>Tasks for the next 7 days</Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Image
          style={{ width: 120, height: 120 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/9537/9537221.png",
          }}
        />
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})
