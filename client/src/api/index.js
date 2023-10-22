import axios from 'axios'

const API = axios.create({
  baseURL: "https://stack-overflow-project.onrender.com"
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>API.post("/questions/Ask", questionData);
export const getAllQuestions = ()=> API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>API.patch(`/questions/vote/${id}`, { value, userId});

export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`,{answerId, noOfAnswers} );
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered ,userId});

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>API.patch(`/user/update/${id}`, updateData);
export const updateFriend = (id,userId) =>API.patch(`/user/addfriend/${id}`, {userId});
export const deleteFriend = (id,userId) =>API.patch(`/user/deletefriend/${id}`, {userId});

export const createPost = (postData)=>API.post("/feed/posts",postData);
export const getAllPosts = ()=>API.get("/feed/get");
export const LikePost = (id, value, userId) =>API.patch(`/feed/like/${id}`, { value, userId});
export const sharePost = (id, userId) =>API.patch(`/feed/share/${id}`, { userId});
export const deletePost = (id) =>API.patch(`/feed/delete/${id}`);