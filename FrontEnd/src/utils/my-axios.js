import axios from 'axios';

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Bearer:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjpmYWxzZSwiaXNzIjoic29mdHlsaW5lcy5jb20iLCJhdWQiOiJzb2Z0eWxpbmVzLmNvbSIsInN1YiI6IjY1OWZjMGE1ZmZjZTcxYTE1OGYxMjVmNCIsImlhdCI6MTcwNDk5ODcyMiwiZXhwIjoxNzA3NTkwNzIyLCJwcm0iOiIwM2Q0Y2FhZTc4YmRkYWU2NjUxY2NkYTU1OTE3MTU4MWNmYWE5OTcwOGE3MGU0NjM5NzljN2UzY2EzMDM2ZGQ1ZDU5M2IwZGZiYjA4N2Y2Yjk5YzJhODA0Y2E4NDEwNTVmYWJlM2MxMGI3MTNjZmQ2ZjRmMWI1MjBkZTQ3NzdmNSJ9.RcsBb6-CS-JqSfbvD3tJPaczyJqklSmOd_PpN5NesfuMeCX5deOCt9ulVDxvWP-WIN9Nuiir718pVH75IdvK1JYCcpE31MJH4V7BgrPyK8qOCUrVGgjHl3bhguf1L6GIvZQh3_Y6gtMSQRj_F33TRiLl6fbNR5sPVcxUNP2XbxzhR_nNxSWveRBIK-t7i1NOQ7_R1I3fxEjWYx6cDHtMogBcZuzKDsa4WFohDjdisdpT11kCG5B_5TRqpJu7mZAiuc2amnqQM-I20cnLTXs4nNprFtbqw-EdlhVp2zvwtiH_T__W2kALXFWmJI_8icVWqARMLP_ZvWTavdtGm9dZSg',
};

let token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbWluIjpmYWxzZSwiaXNzIjoic29mdHlsaW5lcy5jb20iLCJhdWQiOiJzb2Z0eWxpbmVzLmNvbSIsInN1YiI6IjY1OWZjMGE1ZmZjZTcxYTE1OGYxMjVmNCIsImlhdCI6MTcwNDk5ODcyMiwiZXhwIjoxNzA3NTkwNzIyLCJwcm0iOiIwM2Q0Y2FhZTc4YmRkYWU2NjUxY2NkYTU1OTE3MTU4MWNmYWE5OTcwOGE3MGU0NjM5NzljN2UzY2EzMDM2ZGQ1ZDU5M2IwZGZiYjA4N2Y2Yjk5YzJhODA0Y2E4NDEwNTVmYWJlM2MxMGI3MTNjZmQ2ZjRmMWI1MjBkZTQ3NzdmNSJ9.RcsBb6-CS-JqSfbvD3tJPaczyJqklSmOd_PpN5NesfuMeCX5deOCt9ulVDxvWP-WIN9Nuiir718pVH75IdvK1JYCcpE31MJH4V7BgrPyK8qOCUrVGgjHl3bhguf1L6GIvZQh3_Y6gtMSQRj_F33TRiLl6fbNR5sPVcxUNP2XbxzhR_nNxSWveRBIK-t7i1NOQ7_R1I3fxEjWYx6cDHtMogBcZuzKDsa4WFohDjdisdpT11kCG5B_5TRqpJu7mZAiuc2amnqQM-I20cnLTXs4nNprFtbqw-EdlhVp2zvwtiH_T__W2kALXFWmJI_8icVWqARMLP_ZvWTavdtGm9dZSg';

const axiosInstance = axios.create({
  baseURL: 'https://taskmanagerapi.yakoubi.tech/api/v1',
  headers,
});

//request interceptor to add the auth token header to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('gomydesk_token');
    // if (accessToken) {
    config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     registerMetrics(response);
//     return response;
//   },
//   async (error) => {
//     registerMetrics(error?.response);

//     const previousRequest = error?.config;
//     if (error?.response?.status === 401 && !previousRequest?.sent) {
//       previousRequest.sent = true;

//       return new Promise((resolve) => {
//         refreshSubscribers.push((newAccessToken) => {
//           previousRequest.headers['X-Session-Token'] = newAccessToken;
//           resolve(axiosInstance(previousRequest));
//         });
//       });
//     }
//     return Promise.reject((error.response && error.response.data) || 'Something went wrong');
//   }
// );

export default axiosInstance;
