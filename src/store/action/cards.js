import api from '../../repository'
import type from '../types'

export const getData = () => {
    return {
        type: type.getCards
    }
}

export const addCard = (data) => (dispatch) => {
    return api.addCard(data)
        .then(() => {
            return dispatch({
                type: type.addCard
            })
        })
}

export const deleteCard = (data) => (dispatch) => {
    return api.deleteCard(data)
        .then(() => {
            return dispatch({
                type: type.deleteCard
            })
        })
}

export const updateCard = (id, { columnId, title }) => (dispatch) => {
    return api.updateCard(id, { columnId, title })
        .then(() => {
            return dispatch({
                type: type.updateCard
            })
        })
}