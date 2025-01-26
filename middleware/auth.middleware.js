export const isAuth = (req, res, next) => {
  if (req?.session?.passport?.user) {
    return next();
  }
  return res.redirect("/login");
};

export const isGuest = (req, res, next) => {
  if (!req?.session?.passport?.user) {
    return next();
  }
  return res.redirect("/");
};
