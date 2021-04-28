import axios from 'axios';
import { LOGIN, GET_USERS, ADD_USERS, GET_USER_ID, LOGOUT } from "../contans";
import Cookie from 'js-cookie';

const url = 'localhost:3001';

export const createUser = (data) => {
    return (dispatch) => {

        console.log(data)
        axios.post(`http://${url}/users`, data)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type:ADD_USERS,
                    payload: res.data.data
                })
            })
    }
}


export const login = (data, susses) => {
    return (dispatch, getState) => {

        console.log(data, )
        axios.post(`http://${url}/users/singin`, data)
            .then(res => {
				let loger = res.data.data.log
				let roleLog = res.data.data.role
                dispatch({
                    type: LOGIN,
                    payload : res.data.data
				})
				const state = getState();
				console.log('****State')
				console.log(state)
				Cookie.set('userLoad', JSON.stringify(state.userLog));
				/*********Function Callback ***********/
				susses(loger, roleLog)
			})
			
            .catch(err => {
                console.log(err)
            })
    }
}

export const logout = (data) => {
	return (dispatch, getState) => {
		console.log('HPPPP');
		axios.get(`http://${url}/users/log/logout`).then((res) => {
			console.log(res.data.message);
			dispatch({
				type: LOGOUT,
			});
		});
	};
};

export function getUsers() {
	return (dispatch) => {
		axios
			.get(`http://${url}/users`)
			.then((res) => {
				console.log(res.data.data);
				if (res.status === 200) {
			    dispatch({
			    	type: GET_USERS,
			    	payload: res.data.data,
			    });
				} else {
					dispatch({
						type: 500,
					});
				}
			})
			.catch((err) => {
				console.log('Catch Error');
				console.log(err);
			});
	};
}


export function getUsersByID(id) {
	return (dispatch) => {
        console.log("id", id)
		axios
			.get(`http://${url}/users/${id}`)
			.then((res) => {
				console.log(res.data);
				if (res.status === 200) {
			    dispatch({
			    	type: GET_USER_ID,
			    	payload: res.data.data[0],
			    });
				} else {
					dispatch({
						type: 500,
					});
				}
			})
			.catch((err) => {
				console.log('Catch Error');
				console.log(err);
			});
	};
}




