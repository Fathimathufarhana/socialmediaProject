import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// Assuming this is the correct import path
import ViewPost from './ViewPost';

const drawerWidth = 250;

const FriendList = ({ followers }) => {
  return (
    <>
    <div className=''
      style={{
        // display: 'flex',
        // justifyContent: 'flex-end',
        position: 'fixed',
        width:"18%",
        right: 0,
        top: '5rem',
        textAlign: "center",
        // marginBottom:"200rem"
      }}
    >

      <h1>Friend List</h1>
      <div>
      {followers &&
        followers.map((friend) => {
          return(
            <div >
          <div style={{ width: drawerWidth }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li
                // key={friend.id}
                style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
              >
                <Avatar
                  // alt={friend.firstname} 
                  src={`http://localhost:4002/uploads/${friend.profilePicture}`}
                  style={{ marginRight: 10 }}
                />
                <div>
                  <Typography variant="subtitle1" color="textPrimary">
                    {friend.firstname} {friend.lastname}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {/* {friend.followers.friendlist.lenght} */}
                    7 followers
                  </Typography>
                </div>
              </li>
            </ul>
          </div>
          </div>
          )
        })}
      </div>
    </div>
    </>
  );
};

export default FriendList;
