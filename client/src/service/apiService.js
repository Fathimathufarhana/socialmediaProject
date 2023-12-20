import axios from "axios";

export const getUserById = async () => {
  try {
    let response = await axios.get(
      `http://localhost:4002/api/user/${localStorage.getItem("id")}`
    );
    // console.log(response.data,"id vechitt kittnd");
    return response.data;
  } catch (error) {
    return error;
  }
};