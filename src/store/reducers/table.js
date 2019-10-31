import type from '../types'

const initionalState = {
    columns: [],
    cards: []
};


export default function cards(state = initionalState, action) {
    switch (action.type) {
        case type.successGetCard:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}