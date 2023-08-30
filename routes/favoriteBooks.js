const router = require("express").Router();
const Favoritebooks = require("../models/favoritebooks");

router.post("/addfavoritebook", async (req, res) => {
  /* We want to send the user information to the back end */
  const newFavoriteBook = new Book({
    title: req.body.title,
    authors: req.body.authors,
    description: req.body.description,
    edition: req.body.edition,
    format: req.body.format,
    genres: req.body.genres,
    image_url: req.body.image_url,
  });

  try {
    /* After getting all the information above we try to save it in our data base */
    const savedBookData = await newFavoriteBook.save();
    res.status(200).json(savedBookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET ALL FAVORITEBOOKS */
router.get("/getallfavoritebooks", async (req, res) => {
  try {
    const getAllFavoriteBooks = await Favoritebooks.find({});
    res.status(200).json(getAllFavoriteBooks);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /* DELETE A SPECIFIC BOOK INFO */
// router.delete("/:id", async (req, res) => {
//   try {
//     await Book.findByIdAndDelete({ _id: req.params.id });
//     res.status(200).json("Book information deleted successfuly!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// /* UPDATE A SPECIFIC BOOK INFO */
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedBook = await Book.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: req.body,
//       },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json(updatedBook);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const findBook = req.params.id;

//     // Find the user by ID
//     const foundBook = await Book.findById(findBook);

//     if (!foundBook) {
//       return res.status(404).send("User not found");
//     }
//     res.status(200).json(foundBook);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error retrieving book");
//   }
// });

module.exports = router;
