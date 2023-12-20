// // Import necessary modules
// import User from '../models/User.js';

// // Controller function to get user profile
// export const getUserProfile = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const { _id, name, email, avatar, posts, followers, following } = user;
//     res.status(200).json({ _id, name, email, avatar, posts, followers, following });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// // // Controller function to handle follow action
// // export const followUser = async (req, res) => {
// //   try {
// //     const userId = req.params.userId;
// //     // Add logic to update follow status in the database
// //     // For example, you can update the followers/following arrays in the User model
// //     // based on the request information.
// //     // Make sure to handle validation and error cases appropriately.
// //     res.status(200).json({ message: 'User followed successfully' });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // };
