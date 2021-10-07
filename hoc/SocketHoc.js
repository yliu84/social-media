import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import NotificationPortal from '../components/Home/NotificationPortal';
import MessageNotificationModal from '../components/Home/MessageNotificationModal';
import baseUrl from '../utils/baseUrl';
import newMsgSound from '../utils/newMsgSound';
import getUserInfo from '../actions/userActions';

const SocketHoc = ({ children, user, socket }) => {
  const [notificationPopup, showNotificationPopup] = useState(false);
  const [newNotification, setNewNotification] = useState(null);
  const [newMessageReceived, setNewMessageReceived] = useState(null);
  const [newMessageModal, showNewMessageModal] = useState(false);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit('join', { userId: user._id });

      socket.current.on('newMsgReceived', async ({ newMsg }) => {
        const { name, profilePicUrl } = await getUserInfo(newMsg.sender);

        if (user.newMessagePopup) {
          setNewMessageReceived({
            ...newMsg,
            senderName: name,
            senderProfilePic: profilePicUrl,
          });

          showNewMessageModal(true);
        }
        newMsgSound(name);
      });

      socket.current.on(
        'newNotificationReceived',
        ({ name, profilePicUrl, username, postId }) => {
          setNewNotification({ name, profilePicUrl, username, postId });
          showNotificationPopup(true);
        }
      );
    }
  }, []);

  return (
    <>
      {notificationPopup && newNotification !== null && (
        <NotificationPortal
          newNotification={newNotification}
          notificationPopup={notificationPopup}
          showNotificationPopup={showNotificationPopup}
        />
      )}

      {newMessageModal && newMessageReceived !== null && (
        <MessageNotificationModal
          socket={socket}
          showNewMessageModal={showNewMessageModal}
          newMessageModal={newMessageModal}
          newMessageReceived={newMessageReceived}
          user={user}
        />
      )}
      {children}
    </>
  );
};

export default SocketHoc;
