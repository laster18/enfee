import React from 'react';
import styled from 'styled-components';
import Layout from 'components/Layout';
import { Spinner } from 'components/atoms';
import { ReviewMenu, Aside, PenLauncherButton } from 'components/molecules';
import { ReviewPanelList } from 'components/organisms';
import { Link as MenuLinkType } from 'components/molecules/Menu/ReviewMenu';
import {
  HeaderContainer,
  ReviewDetailModalContainer,
} from 'containers/organisms';
import { Review, MyProfileInAside } from 'services/models';
import { Color, Size } from 'src/const';

interface Props {
  menuLinks: MenuLinkType[];
  isModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  reviews: Review[];
  isLoadingReview: boolean;
  myProfile: MyProfileInAside | null;
  isLoggedIn: boolean;
}

const ReviewsTemplate: React.FC<Props> = ({
  menuLinks,
  isModal,
  openModal,
  closeModal,
  reviews,
  isLoadingReview,
  myProfile,
  isLoggedIn,
}) => {
  return (
    <Layout title="レビューページ">
      <HeaderContainer />
      <Body>
        <Contents>
          <NavWrapper>
            <ReviewMenu links={menuLinks} />
          </NavWrapper>
          <MainWrapper>
            {isLoadingReview ? (
              <SpinnerWrapper>
                <Spinner color="primary" height={30} width={30} />
              </SpinnerWrapper>
            ) : (
              <ReviewPanelList reviews={reviews} openModal={openModal} />
            )}
          </MainWrapper>
          <AsideWrapper>
            <Aside myProfile={myProfile} />
          </AsideWrapper>
        </Contents>
      </Body>
      <LauncherWrapper>
        <PenLauncherButton to="/reviews/new" />
      </LauncherWrapper>
      {isModal && <ReviewDetailModalContainer closeModal={closeModal} />}
    </Layout>
  );
};

const Body = styled.div`
  min-height: calc(100vh - 50px);
  padding: 32px 16px;
  background-color: ${Color.BACKGROUND.LIGTH};
  box-sizing: border-box;
`;
const Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const NavWrapper = styled.div`
  width: 200px;
  position: sticky;
  top: 1em;
`;
const MainWrapper = styled.div`
  /* margin-left: 16px; */
  width: 460px;
`;
const AsideWrapper = styled.div`
  width: 240px;
  margin-left: 16px;

  @media (max-width: ${Size.BREAK_POINT.TABLET}px) {
    display: none;
  }
`;
const LauncherWrapper = styled.div`
  display: none;

  @media (max-width: ${Size.BREAK_POINT.TABLET}px) {
    display: inline-block;
    position: fixed;
    bottom: 28px;
    right: 28px;
  }

  @media (max-width: ${Size.BREAK_POINT.MOBILE}px) {
    display: inline-block;
    position: fixed;
    bottom: 18px;
    right: 18px;
  }
`;
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default ReviewsTemplate;
