const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
// Create a new user using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors return Bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      // Check whether User already exists or not?
      try {
        let userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
          res.status(400).json({ message: "Sorry User already Exists" });
        } else {
          let salt = bcrypt.genSaltSync(10);
          let secretPassword = bcrypt.hashSync(req.body.password, salt);
          // Create a new User
          await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secretPassword,
          })
            .then((user) => {
              res.json(user);
            })
            .catch((err) => {
              console.log(err);
              res.json({
                error: "Please enter a unique Value",
                message: err.message,
              });
            });
          const data = {
            user: {
              id: User.id,
            },
          };
          const authToken = jwt.sign(data, process.env.HASH_SECRET_KEY);
          console.log(authToken);
          // res.json({ authToken });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error occured is ->${error}` });
      }
    }
  }
);
// Authenticate an user using: POST "/api/auth/login". No login Required
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    // If there errors, return Bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: "Invalid Credentials!!" });
        } else {
          let comparePassword = bcrypt.compareSync(password, user.password);
          if (!comparePassword) {
            return res.status(400).json({ error: "Invalid Credentials" });
          } else {
            const data = {
              user: {
                id: user.id,
              },
            };
            const authToken = jwt.sign(data, process.env.HASH_SECRET_KEY);
            res.json({ authToken: authToken });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Some error has occured" });
      }
    }
  }
);
// Get Loggedin user details using: GET "/api/auth/getuser". Requires authentication
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    let userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Some internal error." });
  }
});

module.exports = router;
