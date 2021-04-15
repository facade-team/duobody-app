import AsyncStorage from "@react-native-community/async-storage";

export default {
  storeToken: async (token) => {
    try {
      await AsyncStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      console.log("Something went wrong", error);
    }
  },
  getToken: async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      let parsedToken = JSON.parse(token);
      console.log(parsedToken);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
}