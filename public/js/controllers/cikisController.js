/* eslint-disable */
import { cikis } from '../models/cikisModel';

const cikisButon = document.getElementById('cikisButon');

if (cikisButon) {
  cikisButon.addEventListener('click', () => {
    cikis();
  });
}
