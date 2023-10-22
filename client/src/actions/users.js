import * as api from "../api";
import { setCurrentUser } from './currentUser'
export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, updateData);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addFriend = (id, userId) => async (dispatch) => {
  try {
    await api.updateFriend(id, userId);
    let obj = JSON.parse(localStorage.getItem('Profile'));
    obj.result.friends.push(id);
    localStorage.setItem("Profile", JSON.stringify(obj));
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  } catch (error) {
    console.log(error);
  }
};

export const delFriend = (id, userId) => async (dispatch) => {
  try {
    await api.deleteFriend(id, userId);
    let obj = JSON.parse(localStorage.getItem('Profile'));
    obj.result.friends = obj.result.friends.filter((ele)=>ele !== id);
    localStorage.setItem("Profile", JSON.stringify(obj));
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
  } catch (error) {
    console.log(error);
  }
};
