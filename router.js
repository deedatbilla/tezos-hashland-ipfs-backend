const express = require("express");
const router = express.Router();
// const IPFS = require("ipfs-core");
const ipfsAPI = require("ipfs-api");
const multer = require("multer");
const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  // storage: storage,
  // fileFilter: (req, file, cb) => {
  //   if (
  //     file.mimetype == "image/png" ||
  //     file.mimetype == "image/jpg" ||
  //     file.mimetype == "image/jpeg"
  //   ) {
  //     cb(null, true);
  //   } else {
  //     cb(null, false);
  //     return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  //   }
  // },
});
router.get("/", (req, res) => {
  res.send({ message: "hi" });
});

router.post("/get-file-hash", upload.single("document"), async (req, res) => {
  // Create a new user
  try {
    console.log(req.file);

    const results = await ipfs.files.add(req.file.buffer);
    // for  (const { cid } of results) {
    //   // CID (Content IDentifier) uniquely addresses the data
    //   // and can be used to get it again.
    console.log(results);
    // }
    res.status(201).send({ hash: results });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/get-file/:hash", async (req, res) => {
  // Create a new user
  try {
    const { hash } = req.params;

    ipfs.files.get(hash, function (err, files) {
      files.forEach((file) => {
        console.log(file.path);
        // console.log(file.content.toString('utf8'))
      });
    });
    // res.status(201).send({ fileUrl: `https://ipfs.io/ipfs/${}` });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
