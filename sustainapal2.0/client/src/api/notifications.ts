import api from './api';

// Description: Get user notifications
// Endpoint: GET /api/notifications
// Request: {}
// Response: {
//   notifications: Array<{
//     id: string,
//     title: string,
//     message: string,
//     read: boolean,
//     timestamp: string
//   }>
// }
export const getNotifications = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        notifications: [
          {
            id: '1',
            title: 'Energy Goal Achieved',
            message: 'Congratulations! You reached your daily energy goal.',
            read: false,
            timestamp: '2023-05-12T14:30:00Z'
          },
          {
            id: '2',
            title: 'New Badge Unlocked',
            message: 'You\'ve unlocked the "Power Saver" badge!',
            read: false,
            timestamp: '2023-05-11T09:15:00Z'
          },
          {
            id: '3',
            title: 'Bill Forecast Updated',
            message: 'Your monthly bill forecast has been updated.',
            read: true,
            timestamp: '2023-05-10T16:45:00Z'
          },
          {
            id: '4',
            title: 'Community Milestone',
            message: 'Your campus has saved 1000 kWh this month!',
            read: true,
            timestamp: '2023-05-09T11:20:00Z'
          }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/notifications');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Mark notification as read
// Endpoint: POST /api/notifications/:id/read
// Request: {}
// Response: { success: boolean }
export const markNotificationAsRead = (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 300);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post(`/api/notifications/${id}/read`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Mark all notifications as read
// Endpoint: POST /api/notifications/read-all
// Request: {}
// Response: { success: boolean }
export const markAllNotificationsAsRead = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 300);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/notifications/read-all');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};