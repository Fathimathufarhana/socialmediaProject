import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ViewPost from './ViewPost'; // Assuming this is the correct import path

const drawerWidth = 250;

const FriendList = () => {
  const friendList = [
    {
      id: 1,
      username: 'Frank Mason',
      followers: 59000,
      profileImage: 'https://placekitten.com/50/50', // Replace with the actual image URL
    },
    {
      id: 2,
      username: 'Andrea Smith',
      followers: 48000,
      profileImage: 'https://placekitten.com/50/51', // Replace with the actual image URL
    },
    {
      id: 3,
      username: 'George Orwell',
      followers: 290000,
      profileImage: 'https://placekitten.com/50/52', // Replace with the actual image URL
    }, {
      id: 2,
      username: 'Andrea Smith',
      followers: 48000,
      profileImage: 'https://placekitten.com/50/51', // Replace with the actual image URL
    },
    {
      id: 3,
      username: 'George Orwell',
      followers: 290000,
      profileImage: 'https://placekitten.com/50/52', // Replace with the actual image URL
    }, {
      id: 4,
      username: 'Andrea Smith',
      followers: 48000,
      profileImage: 'https://placekitten.com/50/51', // Replace with the actual image URL
    },
    {
      id: 5,
      username: 'George Orwell',
      followers: 290000,
      profileImage: 'https://placekitten.com/50/52', // Replace with the actual image URL
    },
    {
      id: 6,
      username: 'Andrea Smith',
      followers: 48000,
      profileImage: 'https://placekitten.com/50/51', // Replace with the actual image URL
    },
    {
      id: 7,
      username: 'George Orwell',
      followers: 290000,
      profileImage: 'https://placekitten.com/50/52', // Replace with the actual image URL
    }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'fixed', right: 0, top: '5rem', zIndex: 1 }}>
      <div style={{ width: drawerWidth }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {friendList.map((friend) => (
            <li key={friend.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Avatar
                alt={friend.username}
                src={friend.profileImage}
                style={{ marginRight: 10 }}
              />
              <div>
                <Typography variant="subtitle1" color="textPrimary">
                  {friend.username}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {friend.followers} followers
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendList;
