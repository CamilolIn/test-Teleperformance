import axios from 'axios';
import { ADD_MENSAJE} from "../contans"

const url = 'localhost:3001';

export const createMensaje = (data) => {
    return (dispatch) => {

        console.log(data)
        axios.post(`http://${url}/mensajes`, data)
            .then(res => {
                dispatch({
                    type: ADD_MENSAJE,
			    	payload: res.data.data,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}




