const auth = (state = [], action) => {
    switch (action.type) {
        case 'SIGNIN':
            return {
                ...state, user: action.payload
            }
            default:
                return state;
    }
}

export default auth;