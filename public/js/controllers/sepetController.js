/* eslint-disable */
const sepetButon = document.getElementById('odemeButon');

if (sepetButon) {
  $('#odemeButon').on('click', (e) => {
    e.preventDefault();
    console.log('hi');
  });
}
