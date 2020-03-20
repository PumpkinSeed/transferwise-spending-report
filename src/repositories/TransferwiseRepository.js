import axios from 'axios';

const baseURL = 'https://api.transferwise.com';

const axiosInstance = axios.create({baseURL});

export default {

  setAuthorization(apiKey) {
    axiosInstance.defaults.headers.common['Authorization'] = 'Bearer '+ apiKey;
  },

  removeAuthorization() {
    delete axiosInstance.defaults.headers.common['Authorization'];
  },

  getProfiles() {
    return axiosInstance.get('/v1/profiles');
  },

  getAccounts(profileId) {
    return axiosInstance.get('/v1/borderless-accounts?profileId=' + profileId);
  },

  getStatement(profileId, accountId, currency, intervalStart, intervalEnd) {
    const params = {
      currency,
      intervalStart,
      intervalEnd
    };
    return axiosInstance.get(`v3/profiles/${profileId}/borderless-accounts/${accountId}/statement.json`, {params});
  }

}