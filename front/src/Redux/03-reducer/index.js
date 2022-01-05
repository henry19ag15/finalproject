
const initialState = {
    estadoTest: 'Hola',

    
}





export default function rootReducer(state = initialState, action) {




    switch (action.type) {

        case "POST_USER":
            return {
                ...state
            }

        default: return state;

    }









}