const authentificationCheck = {
  checkSession: (req) => {
    return !!req.session;
  },
  checkAuthenticatedUser: (req) => {
    return authentificationCheck.checkSession(req) && !!req.session.userid;
  },
  checkAuthenticatedAdmin: (req) => {
    return (
      authentificationCheck.checkAuthenticatedUser(req) && !!req.session.admin
    );
  },
};

module.exports = authentificationCheck;
