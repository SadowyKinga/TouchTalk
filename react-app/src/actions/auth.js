import axios from 'axios';

export const signin = (signinData) => async (dispatch) => {
    try {
        const {
            data
        } = await axios.post(`http://localhost:3000/api/login?email=${signinData.email}&password=${signinData.password}`)
        dispatch({
            type: 'SIGNIN',
            payloud: data
        })
    } catch (error) {

    }
}