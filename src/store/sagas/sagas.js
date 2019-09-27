import { call, takeLatest } from 'redux-saga/effects'
import { getData } from '../action/cards'


function* onUpdatedCardList() {
    yield call(getData)
}

function* watchUpdateCardList() {
    yield takeLatest(["ADD_CARD", "DELETE_CARD", "UPDATE_CARD"], onUpdatedCardList);
}

export default watchUpdateCardList;