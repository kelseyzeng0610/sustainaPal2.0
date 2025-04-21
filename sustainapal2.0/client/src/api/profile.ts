import api from './api';

// Description: Get user profile
// Endpoint: GET /api/profile
// Request: {}
// Response: {
//   user: {
//     id: string,
//     name: string,
//     email: string,
//     avatar: string,
//     joinDate: string,
//     stats: {
//       totalSaved: number,
//       badgesEarned: number,
//       streakDays: number
//     }
//   }
// }
export const getProfileData = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 'user-current',
          name: 'Sam Smith',
          email: 'sam@college.edu',
          avatar: '/avatars/default.png',
          joinDate: '2023-08-15T00:00:00Z',
          level: 4,
          points: 850,
          streak: 5,
          totalSaved: { 
            money: 152.75, 
            carbon: 87.2, 
            energy: 215.6 
          },
          badges: [
            {
              id: 'badge-1',
              name: 'Energy Saver',
              icon: '⚡',
              unlockedAt: '2023-09-02T15:23:11Z'
            },
            {
              id: 'badge-2',
              name: 'Water Wise',
              icon: '💧',
              unlockedAt: '2023-09-18T08:45:30Z'
            },
            {
              id: 'badge-3',
              name: 'Streak Starter',
              icon: '🔥',
              unlockedAt: '2023-08-20T19:12:45Z'
            }
          ],
          achievements: [
            {
              id: 'ach-1',
              name: 'Power Saver',
              description: 'Save $100 on electricity',
              progress: 85,
              max: 100,
              completed: false
            },
            {
              id: 'ach-2',
              name: 'Consistency King',
              description: 'Complete daily challenges for 7 days in a row',
              progress: 5,
              max: 7,
              completed: false
            },
            {
              id: 'ach-3',
              name: 'Eco Scholar',
              description: 'Read 10 sustainability tips',
              progress: 10,
              max: 10,
              completed: true
            }
          ]
        }
      });
    }, 500);
  });
};

// Description: Update user settings
// Endpoint: PUT /api/profile/settings
// Request: { notificationFrequency?: string, reminderTime?: string, username?: string }
// Response: { success: boolean }
export const updateUserSettings = (settings: { notificationFrequency?: string, reminderTime?: string, username?: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true
      });
    }, 500);
  });
};