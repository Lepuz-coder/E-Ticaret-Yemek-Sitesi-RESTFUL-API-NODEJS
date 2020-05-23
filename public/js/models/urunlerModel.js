/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';

export const begenToggle = async (id) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/begen/toggle/${id}`,
    });

    if (res.data) {
      alert('eklendi');
    } else {
      alert('cikarildi');
    }
  } catch (err) {
    console.log(err.response.data);
  }
};
