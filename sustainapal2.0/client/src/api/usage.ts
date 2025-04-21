import api from './api';

// Description: Get energy usage by category
// Endpoint: GET /api/energy/usage/categories
// Request: {}
// Response: {
//   provider: string,
//   usageByCategory: Array<{
//     category: string,
//     usage: number,
//     cost: number,
//     icon: string
//   }>,
//   usageHistory: Array<{
//     date: string,
//     usage: number
//   }>
// }
export const getUsageByCategory = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        provider: 'Eversource',
        usageByCategory: [
          { category: 'Lighting', usage: 2.3, cost: 4.15, icon: 'lightbulb' },
          { category: 'Heating', usage: 5.7, cost: 10.26, icon: 'thermometer' },
          { category: 'Electricity', usage: 3.8, cost: 6.84, icon: 'zap' },
          { category: 'Water', usage: 2.1, cost: 3.78, icon: 'droplet' },
          { category: 'Appliances', usage: 4.2, cost: 7.56, icon: 'refrigerator' }
        ],
        usageHistory: [
          { date: '2023-05-05', usage: 12.8 },
          { date: '2023-05-06', usage: 13.2 },
          { date: '2023-05-07', usage: 11.5 },
          { date: '2023-05-08', usage: 10.9 },
          { date: '2023-05-09', usage: 12.0 },
          { date: '2023-05-10', usage: 12.7 },
          { date: '2023-05-11', usage: 13.6 }
        ]
      });
    }, 500);
  });
  // Uncomment the below lines to make an actual API call
  // try {
  //   return await api.get('/api/energy/usage/categories');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.error || error.message);
  // }
};