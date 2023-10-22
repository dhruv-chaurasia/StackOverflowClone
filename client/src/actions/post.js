import * as api from "../api/index";

export const createPost = (postData, navigate) => async (dispatch) => {
  try {
    const formData = postData;
    const { data } = await api.createPost(formData);
    dispatch({ type: "CREATE_POST", payload: data });
    dispatch(fetchAllPosts());
    navigate("/feed");
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllPosts = () => async (disptach) => {
  try {
    const { data } = await api.getAllPosts();
    console.log(data);
    disptach({ type: "FETCH_ALL_POSTS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const LikePost = (id, value, userId) => async (dispatch) => {
  try {
    await api.LikePost(id, value, userId);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const sharePost = (id, userId) => async (dispatch) => {
  try {
    await api.sharePost(id, userId);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch(fetchAllPosts());
  } catch (error) {
    console.log(error);
  }
};
