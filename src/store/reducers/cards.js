const initionalState = {
    dataColumns: [],
    dataCards: []
};


export default function cards(state = initionalState, action) {
    switch (action.type) {
        case 'GET_CARDS':
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }


}