export let initialState = {email:"",otp:"",isOTPInitiated:false};
    
 export function reducer(state,action){
        if(action.type = "SET_NAME"){
            return{
                ...state,
                name:action.paylaod
            }
        }
    }