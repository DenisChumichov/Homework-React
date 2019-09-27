import store from '../store'
import api from '../../repository'

export const getData = () => {
    return Promise.all([api.getColumns(), api.getCards()])
        .then(([columns, cards]) => {
            return store.dispatch({
                type: "GET_CARDS",
                payload: {
                    columns: columns,
                    cards: cards
                }
            })
        })
}

export const addCard = (data) => {
    return api.addCard(data)
        .then(() => {
            return store.dispatch({
                type: "ADD_CARD"
            })
        })
}

export const deleteCard = (data) => {
    return api.deleteCard(data)
        .then(() => {
            return store.dispatch({
                type: "DELETE_CARD"
            })
        })
}

export const updateCard = (id, { data, flag }) => {
    return api.updateCard(id, { data, flag })
        .then(() => {
            return store.dispatch({
                type: "UPDATE_CARD"
            })
        })
}
