const authenticationCheck = {
  checkSession: (req) => {
    return !!req.session;
  },
  checkAuthenticatedUser: (req) => {
    return authenticationCheck.checkSession(req) && !!req.session.userid;
  },
  checkAuthenticatedAdmin: (req) => {
    return (
      authenticationCheck.checkAuthenticatedUser(req) && !!req.session.admin
    );
  },
};

module.exports = authenticationCheck;
