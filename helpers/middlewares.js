const createError = require('http-errors');

exports.isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) next();
  else next(createError(401, "Not logged in"));
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) next();
  else next(createError(403, "Already logged in"));
};

exports.validationLoggin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) next(createError(400, "No user or password specified"));
  else next();
};
