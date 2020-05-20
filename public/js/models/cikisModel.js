import '@babel/polyfill';
import axios from 'axios';

export const cikis = async () => {
  try {
    await axios({
      method: 'POST',
      url: '/api/v1/auth/cikis',
    });

    location.assign('/urunler');
  } catch (err) {
    console.log(err.response.data.message);
  }
};
