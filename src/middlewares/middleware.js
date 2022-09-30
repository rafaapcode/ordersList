exports.middleware = (req, res, next) => {
  res.locals.error = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.deliveryguy;
  next();
};
