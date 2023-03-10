const express = require("express");
const router = express.Router();
const usersController = require("../controller/seller");
const middleware = require("../middleware/seller");
const authMiddleware = require("../middleware/auth");
const uploadMiddleware = require("../middleware/upload");
const redisMiddleware = require("../middleware/redis");

// CREATE
router.post(
  "/register",
  middleware.createUsersSellerValidator,
  usersController.createUsersSeller
);

// READ
router.get(
  "/detail",
  authMiddleware.validateToken,
  authMiddleware.validateRole,
  usersController.getSpecificUsersSeller
);

// READ
router.get(
  "/:id?",
  redisMiddleware.getUsersCust_redis,
  usersController.getUsersSeller
);

// UPDATE
router.patch(
  "/edit",
  authMiddleware.validateToken,
  authMiddleware.validateRole,
  uploadMiddleware.fileExtLimiter([
    ".png",
    ".jpg",
    ".jpeg",
    ".PNG",
    ".JPG",
    ".JPEG",
  ]),
  uploadMiddleware.fileSizeLimiter,
  middleware.updateUsersPartialValidator,
  usersController.updateUsersSellerPartial
);

// UPDATE
router.patch(
  "/edit/:usersid",
  authMiddleware.validateToken,
  authMiddleware.validateRole,
  uploadMiddleware.fileExtLimiter([
    ".png",
    ".jpg",
    ".jpeg",
    ".PNG",
    ".JPG",
    ".JPEG",
  ]),
  uploadMiddleware.fileSizeLimiter,
  middleware.updateUsersPartialValidator,
  usersController.updateUsersSellerAll
);

// // DELETE
// router.delete(
//   "/delete/:id",
//   authMiddleware.validateToken,
//   authMiddleware.validateRole,
//   usersController.deleteUsers
// );

module.exports = router;
