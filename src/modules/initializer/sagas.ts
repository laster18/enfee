import { fork, put, take, takeLatest, select } from 'redux-saga/effects';
import * as localStorage from 'utils/localStorage';
import { login } from 'modules/auth/actions';
import { actionTypes as appActionTypes, fetchMyProfile } from 'modules/app/actions';
import {
  actionTypes as reviewActionTypes,
  fetchProductCategoryList,
} from 'modules/review/actions';
import { selectAuth } from 'modules/auth/selectors';
import { actionTypes, initialized } from './actions';

function* checkTokenInLocalStorage() {
  const token = localStorage.getToken();

  if (token) {
    yield put(login.succeed({ token }));
  }

  yield put(initialized.localstorge());
}

function* runInitializeApp() {
  const { token, isLoggedIn }: ReturnType<typeof selectAuth> = yield select(
    selectAuth,
  );

  // TODO: 並列でapiを叩くようにする
  if (isLoggedIn && token) {
    // ログインユーザに必要なイニシャライズ処理
    yield put(fetchMyProfile.start());
    yield take([
      appActionTypes.FETCH_MY_PROFILE_SUCCEED,
      appActionTypes.FETCH_MY_PROFILE_FAIL,
    ]);
  }
  // すべてのユーザに必要なイニシャライズ処理を書く
  yield put(fetchProductCategoryList.start());
  yield take([
    reviewActionTypes.FETCH_PRODUCT_CATEGORY_LIST_SUCCESS,
    reviewActionTypes.FETCH_PRODUCT_CATEGORY_LIST_FAIL,
  ]);

  yield put(initialized.app());
}

function runInitializeReviewForm() {
  console.log('runInitializeReviewForm');
}

function* watchInitializeApp() {
  yield takeLatest(actionTypes.INITIALIZE_APP, runInitializeApp);
}

function* watchInitializeReviewForm() {
  yield takeLatest(actionTypes.INITIALIZE_REVIEW_FORM, runInitializeReviewForm);
}

export default function* rootSaga() {
  yield fork(checkTokenInLocalStorage);
  yield fork(watchInitializeApp);
  yield fork(watchInitializeReviewForm);
}
