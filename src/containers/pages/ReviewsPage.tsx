import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ReviewsTemplate } from 'components/templates';
import { withInitialize } from 'containers/hocs';
import { RootState } from 'src/modules';
import { userProfileInAsideSelector } from 'services/selectors';
import { fetchReviewList } from 'modules/review/actions';
import { selectReviews } from 'modules/review/selectors';
import { Link as MenuLinkType } from 'components/molecules/Menu/ReviewMenu';
import { Review } from 'src/services/models';

const links: MenuLinkType[] = [
  { text: 'すべて', to: '/reviews/all' },
  { text: 'セブン−イレブン', to: '/reviews/seven-eleven' },
  { text: 'ファミリーマート', to: '/reviews/family-mart' },
  { text: 'ローソン', to: '/reviews/lawson' },
];

const ReviewsPageContainer: React.FC<
  RouteComponentProps<{ store: string }>
> = ({ history, match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviewList.start({}));
  }, []);

  const [isModal, toggleModal] = useState<boolean>(false);

  const openModal = useCallback(() => {
    toggleModal(true);
  }, []);

  const closeModal = useCallback(() => {
    toggleModal(false);
  }, []);

  const { store } = match.params;

  const {
    auth: { isLoggedIn },
    app: { myProfile: myProfileState },
  } = useSelector((state: RootState) => state);
  const { entities: reviews, loaded } = useSelector(selectReviews);

  const myProfile = useMemo(() => userProfileInAsideSelector(myProfileState), [
    myProfileState,
  ]);

  return (
    <ReviewsTemplate
      menuLinks={links}
      isModal={isModal}
      openModal={openModal}
      closeModal={closeModal}
      reviews={reviews}
      isLoadingReview={!loaded}
      myProfile={myProfile}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default withInitialize(withRouter(ReviewsPageContainer));
