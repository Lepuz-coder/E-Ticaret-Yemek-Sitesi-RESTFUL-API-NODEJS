const jwt = require('jsonwebtoken');

module.exports = (id, req, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
  };

  if (req.secure || req.headers['x-forwarded-proto'] === 'https')
    cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);
};
