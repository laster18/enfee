import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ReviewsPage } from 'components/pages';
import { RootState } from 'src/modules';
import { fetchMyProfile } from 'src/modules/app';

/* モックデータ */
import reviewData from 'src/services/mocks/json/reviews.json';
import camelcaseKeys from 'camelcase-keys';
import Review from 'src/services/models/review';

const tmpReviews = camelcaseKeys(reviewData, { deep: true }) as {
  [k: string]: any;
}[];
const reviews = tmpReviews as Review[];

const myProfile = {
  imageUrl:
    'https://s3-ap-northeast-1.amazonaws.com/aohiro-blog/User/avatar/dot.jpg',
  displayName: 'あおひろ',
  loginName: '@aohiro',
  statsList: [
    { heading: 'レビュー', amount: 30 } as const,
    { heading: 'フォロー', amount: 59 } as const,
    { heading: 'フォロワー', amount: 103 } as const,
  ],
};

const ReviewsPageContainer: React.FC<
  RouteComponentProps<{ store: string }>
> = ({ history, match }) => {
  const [isModal, toggleModal] = useState<boolean>(false);

  const isLoadingReview = false;

  const openModal = useCallback(() => {
    toggleModal(true);
  }, []);

  const closeModal = useCallback(() => {
    toggleModal(false);
  }, []);

  const { store } = match.params;

  const { isLoggedIn, isFetchedProfile } = useSelector(
    (state: RootState) => state.app,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && !isFetchedProfile) {
      dispatch(fetchMyProfile.start());
    }
  }, []);

  return (
    <ReviewsPage
      {...{
        isLoadingReview,
        reviews,
        myProfile,
        isModal,
        openModal,
        closeModal,
      }}
    />
  );
};

export default withRouter(ReviewsPageContainer);
