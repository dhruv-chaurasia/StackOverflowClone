import * as api from '../api'
import { setCurrentUser } from './currentUser'
//Redux thunk used to do async actions in redux
export const  signup = (authData, navigate)=>async (dispatch)=>{
    try {
        const { data } = await api.signUp(authData)
        console.log(data);
        dispatch({type:'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/') 
    } catch (error) {
        alert(error.response.data.message);
        // console.log(error);
    }
}
export const  login = (authData, navigate)=>async (dispatch)=>{
    try {
        const {data} = await api.logIn(authData)
        dispatch({type:'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/') 
    } catch (error) {
        alert(error.response.data.message);
        // console.log(error);
    }
}