import '@babel/polyfill';
import axios from 'axios';

export const cikis = async () => {
  try {
    await axios({
      method: 'POST',
      url: '/api/v1/auth/cikis',
    });

    window.setTimeout(() => {
      location.assign('/urunler');
    }, 500);
  } catch (err) {
    console.log(err.response.data.message);
  }
};
