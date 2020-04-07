const initUserController = require('./user/userController');

function initRouters(app) {
  initUserController(app);
}

module.exports = initRouters;