import { put, call, all, takeLatest, fork } from 'redux-saga/effects'
import api from '../../repository'
import type from '../types'
import { getData } from '../action/cards'

function* onUpdatedCardList() {
    yield put(getData())
}

function* watchUpdateCardList() {
    yield takeLatest([type.addCard, type.deleteCard, type.updateCard], onUpdatedCardList);
}

function* onGetCardRequest() {
    const [columns, cards] = yield call(() => Promise.all([api.getColumns(), api.getCards()]))
    yield put({
        type: type.successGetCard,
        payload: {
            columns: columns,
            cards: cards
        }
    })
}

function* watchGetRequest() {
    yield takeLatest(type.getCards, onGetCardRequest);
}

function* mySaga() {
    const watchers = [watchGetRequest, watchUpdateCardList]
    yield all(watchers.map(fork))
}

export default mySaga