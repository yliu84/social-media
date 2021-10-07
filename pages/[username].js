import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { Grid } from 'semantic-ui-react';
import cookie from 'js-cookie';

import baseUrl from '../utils/baseUrl';
import { NoProfilePosts, NoProfile } from '../components/Layout/NoData';
import CardPost from '../components/Post/CardPost';
import { PostDeleteToast } from '../components/Layout/Toast';
import { PlaceHolderPosts } from '../components/Layout/PlaceHolderGroup';
import ProfileMenuTabs from '../components/Profile/ProfileMenuTabs';
import ProfileHeader from '../components/Profile/ProfileHeader';
import Followers from '../components/Profile/Followers';
import Followings from '../components/Profile/Followings';
import UpdateProfile from '../components/Profile/UpdateProfile';
import Settings from '../components/Profile/Settings';

const ProfilePage = ({
  errorLoading,
  profile,
  followersLength,
  followingLength,
  user,
  userFollowStats,
}) => {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [activeItem, setActiveItem] = useState('profile');
  const handleItemClick = (clickedTab) => setActiveItem(clickedTab);

  const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

  const ownAccount = profile?.user._id === user._id;

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        const { username } = router.query;
        const res = await axios.get(
          `${baseUrl}/api/profile/posts/${username}`,
          {
            headers: { Authorization: cookie.get('token') },
          }
        );

        setPosts(res.data);
      } catch (error) {
        alert('Error Loading Posts');
      }

      setLoading(false);
    };
    getPosts();
  }, [router.query.username]);

  useEffect(() => {
    showToast && setTimeout(() => setShowToast(false), 4000);
  }, [showToast]);

  if (errorLoading) return <NoProfile />;

  return (
    <>
      {showToast && <PostDeleteToast />}

      <Grid stackable>
        <Grid.Row>
          <Grid.Column>
            <ProfileMenuTabs
              activeItem={activeItem}
              handleItemClick={handleItemClick}
              followersLength={followersLength}
              followingLength={followingLength}
              ownAccount={ownAccount}
              loggedUserFollowStats={loggedUserFollowStats}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            {activeItem === 'profile' && (
              <>
                <ProfileHeader
                  profile={profile}
                  ownAccount={ownAccount}
                  loggedUserFollowStats={loggedUserFollowStats}
                  setUserFollowStats={setUserFollowStats}
                />

                {loading ? (
                  <PlaceHolderPosts />
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <CardPost
                      key={post._id}
                      post={post}
                      user={user}
                      setPosts={setPosts}
                      setShowToastr={setShowToast}
                    />
                  ))
                ) : (
                  <NoProfilePosts />
                )}
              </>
            )}

            {activeItem === 'followers' && (
              <Followers
                user={user}
                loggedUserFollowStats={loggedUserFollowStats}
                setUserFollowStats={setUserFollowStats}
                profileUserId={profile.user._id}
              />
            )}

            {activeItem === 'following' && (
              <Followings
                user={user}
                loggedUserFollowStats={loggedUserFollowStats}
                setUserFollowStats={setUserFollowStats}
                profileUserId={profile.user._id}
              />
            )}

            {activeItem === 'updateProfile' && (
              <UpdateProfile Profile={profile} />
            )}

            {activeItem === 'settings' && (
              <Settings newMessagePopup={user.newMessagePopup} />
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
      headers: { Authorization: token },
    });

    const { profile, followersLength, followingLength } = res.data;

    return { props: { profile, followersLength, followingLength } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};

export default ProfilePage;
