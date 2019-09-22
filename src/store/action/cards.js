import store from '../store'
import api from '../../repository'

export const getData = () => {
    return api.getData().then(([columns, cards]) => {
        return store.dispatch({
            type: "GET_CARDS",
            payload: {
                dataColumns: columns,
                dataCards: cards
            }
        })
    })
}