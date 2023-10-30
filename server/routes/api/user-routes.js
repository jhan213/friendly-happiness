const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveSub,
  deleteSub,
  editSub,
  login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

// Put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveSub);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/subs/:subId').delete(authMiddleware, deleteSub);

router.route('/subs/:subId').put(authMiddleware, editSub);

module.exports = router;
