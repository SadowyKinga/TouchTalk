import axios from 'axios';
import {SIGNIN, SIGNUP, SIGNIN_ERROR, SIGNUP_ERROR} from './types'

export const signin = (signinData) => async (dispatch) => {
    try {
        const data
         = await axios.post(`http://localhost:8080/api/login?email=${signinData.email}&password=${signinData.password}`)
        console.log(data);
        dispatch({
            type: SIGNIN,
            payloud: data
        })
    } catch (error) {
        dispatch({
            type: SIGNIN_ERROR
        })
    }
}
export const signup = (signupData) => async (dispatch) => {
    try {
        const data = await axios.post(`http://localhost:8080/api/register`, signupData)
        console.log(data);
        dispatch({
            type: SIGNUP,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SIGNUP_ERROR
        })
    }
};