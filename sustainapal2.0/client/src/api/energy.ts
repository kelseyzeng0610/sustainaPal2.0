import api from './api';

// Description: Get user's current energy usage
// Endpoint: GET /api/energy/current
// Request: {}
// Response: {
//   currentUsage: number,
//   dailyGoal: number,
//   costSoFar: number,
//   predictedBill: number,
//   budget: number
// }
export const getCurrentEnergyUsage = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        currentUsage: 12.4,
        dailyGoal: 15,
        costSoFar: 5.75,
        predictedBill: 42.30,
        budget: 50.00
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/energy/current');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get user's bill forecast
// Endpoint: GET /api/energy/forecast
// Request: {}
// Response: {
//   forecast: number,
//   history: Array<{ month: string, amount: number }>,
//   budget: number
// }
export const getBillForecast = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        forecast: 42.30,
        history: [
          { month: 'Jan', amount: 48.25 },
          { month: 'Feb', amount: 45.10 },
          { month: 'Mar', amount: 43.75 },
          { month: 'Apr', amount: 42.30 }
        ],
        budget: 50.00
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/energy/forecast');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get personalized energy saving tips
// Endpoint: GET /api/energy/tips
// Request: {}
// Response: {
//   tips: Array<{
//     id: string,
//     title: string,
//     savings: number,
//     icon: string
//   }>,
//   dailyChallenge: {
//     title: string,
//     progress: number,
//     reward: number
//   }
// }
export const getSavingTips = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tips: [
          {
            id: '1',
            title: 'Turn off your desk lamp when away',
            savings: 5,
            icon: 'lightbulb'
          },
          {
            id: '2',
            title: 'Unplug chargers when not in use',
            savings: 3,
            icon: 'plug'
          },
          {
            id: '3',
            title: 'Lower thermostat by 2°F',
            savings: 8,
            icon: 'thermometer'
          },
          {
            id: '4',
            title: 'Use natural light during daytime',
            savings: 4,
            icon: 'sun'
          },
          {
            id: '5',
            title: 'Switch to LED bulbs',
            savings: 7,
            icon: 'bulb'
          }
        ],
        dailyChallenge: {
          title: 'Reduce usage by 5% today',
          progress: 60,
          reward: 2.5
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/energy/tips');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get community leaderboard
// Endpoint: GET /api/energy/leaderboard
// Request: {}
// Response: {
//   leaderboard: Array<{
//     id: string,
//     name: string,
//     avatar: string,
//     savings: number
//   }>,
//   currentUser: {
//     id: string,
//     position: number
//   }
// }
export const getLeaderboard = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        leaderboard: [
          { id: '1', name: 'Emma S.', avatar: '/avatars/1.png', savings: 12.50 },
          { id: '2', name: 'Liam T.', avatar: '/avatars/2.png', savings: 10.75 },
          { id: '3', name: 'Olivia M.', avatar: '/avatars/3.png', savings: 9.30 },
          { id: '4', name: 'Noah K.', avatar: '/avatars/4.png', savings: 8.45 },
          { id: '5', name: 'Ava P.', avatar: '/avatars/5.png', savings: 7.80 },
          { id: 'current', name: 'You', avatar: '/avatars/user.png', savings: 9.30 }
        ],
        currentUser: {
          id: 'current',
          position: 3
        }
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/energy/leaderboard');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Get user's savings information
// Endpoint: GET /api/energy/savings
// Request: {}
// Response: {
//   totalSaved: number,
//   savingsPercentage: number
// }
export const getSavings = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalSaved: 37.50,
        savingsPercentage: 25
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/energy/savings');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Update savings percentage
// Endpoint: POST /api/energy/savings
// Request: { percentage: number }
// Response: { success: boolean, message: string }
export const updateSavingsPercentage = (data: { percentage: number }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Savings percentage updated successfully'
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/energy/savings', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

// Description: Set monthly budget
// Endpoint: POST /api/energy/budget
// Request: { budget: number }
// Response: { success: boolean, message: string, budget: number }
export const setBudget = (data: { budget: number }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Budget set successfully',
        budget: data.budget
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.post('/api/energy/budget', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};

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