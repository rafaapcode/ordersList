exports.middleware = (req, res, next) => {
  res.locals.error = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.delivery = req.session.deliveryGuy;
  next();
};
