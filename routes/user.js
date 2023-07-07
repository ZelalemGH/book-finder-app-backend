const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js"); 
const jwt = require("jsonwebtoken");

/* ADD A USER */

router.post("/signup", async (req, res) => {
  /* we want to send the user information to the back end */
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_SEC
    ).toString(),
  });

  try {
    /* After getting all the information above we try to save it in our data base */
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET All USERS */
router.get('/getallusers', async (req, res) => {
  try {
    const getAllUsers = await User.find({});
    res.status(200).json(getAllUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET A SPECIFIC USER INFO */

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving user');
  }
});

/* UPDATE A SPECIFIC USER INFO */

router.put("/:id", async(req, res)=> {
  
  console.log("id", req.params.id)
  try{
    const query = { _id: req.params.id};
    const updatedUser = await User.findOneAndUpdate(query, { 
      $set: req.body
    }, 
    {
      new: true,
    });
    res.status(200).json(updatedUser);
    
  } catch (err) {
      res.status(500).json(err)
  }
});

/* DELETE A SPECIFIC User INFO */
router.delete('/:id', async(req, res)=> {
  try {
    await User.findByIdAndDelete({_id: req.params.id});
    res.status(200).json("User information deleted successfuly!");
  } catch (err) {
      res.status(500).json(err)
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("wrong email");
    
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_SEC 
    );

    const realPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
    realPassword !== req.body.password &&
       res.status(401).json("Wrong password");

       const token = jwt.sign({ userId: user._id }, "secretKey", {
         expiresIn: "1hr",
       })

       const { password, ...others } = user._doc;
       res.status(200).json({ ...others, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
