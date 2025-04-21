import api from './api';

// Description: Get user's badges
// Endpoint: GET /api/energy/badges
// Request: {}
// Response: {
//   badges: Array<{
//     id: string,
//     name: string,
//     icon: string,
//     unlocked: boolean,
//     progress?: number
//   }>,
//   nextBadge: {
//     id: string,
//     name: string,
//     icon: string,
//     progress: number
//   }
// }
export const getBadges = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        badges: [
          { id: '1', name: 'First Week Saver', icon: 'award', unlocked: true },
          { id: '2', name: 'Eco-Champion', icon: 'leaf', unlocked: true },
          { id: '3', name: 'Power Saver', icon: 'zap', unlocked: false, progress: 70 },
          { id: '4', name: 'Conservation Master', icon: 'droplet', unlocked: false, progress: 30 },
          { id: '5', name: 'Green Guru', icon: 'tree', unlocked: false, progress: 10 },
          { id: '6', name: 'Energy Wizard', icon: 'sparkles', unlocked: false, progress: 5 }
        ],
        nextBadge: {
          id: '3',
          name: 'Power Saver',
          icon: 'zap',
          progress: 70
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/energy/badges');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};