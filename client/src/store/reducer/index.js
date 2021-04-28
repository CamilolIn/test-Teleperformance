import { LOGIN,  ADD_MENSAJE, GET_USERS, ADD_USERS, GET_USER_ID, LOGOUT } from "../contans"



import Cookie from 'js-cookie';

const userLoad = Cookie.getJSON('userLoad') || null
console.log('***cookie***')
console.log('userLoad')

const initialState = {
    userRegister:{},
    userLog : userLoad,
    mensajes:[],
    users:[],
    userDetail:{},
    logged: false

}

const ReducerRoot = (state = initialState, action) => {
    console.log(action)
    switch(action.type){
        /********LOGIN**** */
        case LOGIN:
            return {...state, userLog: action.payload}
        case LOGOUT:
            return {...state, userLog:[], logged:false}

        /********USERS**** */
        case GET_USERS:
            return {...state, users: action.payload} 
        case ADD_USERS:
            return {...state, users: state.users.concat(action.payload)}   
        case GET_USER_ID:
            return  {...state, userDetail:action.payload}    
            
        /********MENSAJES**** */
        case ADD_MENSAJE:
            return {...state, mensajes: state.mensajes.concat(action.payload)}
    }
}



export default ReducerRoot