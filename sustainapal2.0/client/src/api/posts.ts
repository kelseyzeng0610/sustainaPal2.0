import api from './api';

// Description: Get community posts
// Endpoint: GET /api/community/posts
// Request: {}
// Response: {
//   posts: Array<{
//     id: string,
//     author: {
//       id: string,
//       name: string,
//       avatar: string
//     },
//     content: string,
//     likes: number,
//     comments: Array<{
//       id: string,
//       author: {
//         id: string,
//         name: string,
//         avatar: string
//       },
//       content: string,
//       timestamp: string
//     }>,
//     timestamp: string
//   }>
// }
export const getPosts = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        posts: [
          {
            id: '1',
            author: {
              id: '1',
              name: 'Emma S.',
              avatar: '/avatars/1.png'
            },
            content: 'Just reduced my monthly energy bill by 15% by following the tips in this app! 🌱 #SustainaPal',
            likes: 12,
            comments: [
              {
                id: '1',
                author: {
                  id: '2',
                  name: 'Liam T.',
                  avatar: '/avatars/2.png'
                },
                content: 'That\'s amazing! Which tips helped the most?',
                timestamp: '2023-05-12T10:30:00Z'
              },
              {
                id: '2',
                author: {
                  id: '1',
                  name: 'Emma S.',
                  avatar: '/avatars/1.png'
                },
                content: 'Switching to LED bulbs and unplugging chargers when not in use!',
                timestamp: '2023-05-12T11:15:00Z'
              }
            ],
            timestamp: '2023-05-12T09:45:00Z'
          },
          {
            id: '2',
            author: {
              id: '3',
              name: 'Olivia M.',
              avatar: '/avatars/3.png'
            },
            content: 'Does anyone know how to optimize heating usage? My bill is still quite high even with thermostat adjustments. 🤔',
            likes: 8,
            comments: [
              {
                id: '3',
                author: {
                  id: '5',
                  name: 'Ava P.',
                  avatar: '/avatars/5.png'
                },
                content: 'Try adding weather stripping around doors and windows - made a huge difference for me!',
                timestamp: '2023-05-11T16:20:00Z'
              }
            ],
            timestamp: '2023-05-11T15:30:00Z'
          },
          {
            id: '3',
            author: {
              id: '4',
              name: 'Noah K.',
              avatar: '/avatars/4.png'
            },
            content: 'Just unlocked the Power Saver badge! Who else has earned badges lately? #SustainaPalAchievements',
            likes: 15,
            comments: [],
            timestamp: '2023-05-10T18:45:00Z'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/community/posts');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Add comment to a post
// Endpoint: POST /api/community/posts/:postId/comments
// Request: { content: string }
// Response: {
//   success: boolean,
//   comment: {
//     id: string,
//     author: {
//       id: string,
//       name: string,
//       avatar: string
//     },
//     content: string,
//     timestamp: string
//   }
// }
export const addComment = (postId: string, content: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        comment: {
          id: Date.now().toString(),
          author: {
            id: 'current',
            name: 'You',
            avatar: '/avatars/user.png'
          },
          content,
          timestamp: new Date().toISOString()
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/community/posts/${postId}/comments`, { content });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Like a post
// Endpoint: POST /api/community/posts/:postId/like
// Request: {}
// Response: { success: boolean, likes: number }
export const likePost = (postId: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        likes: Math.floor(Math.random() * 30) + 1 // Random number 1-30
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/community/posts/${postId}/like`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};