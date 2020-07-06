//
// Upload Object
//
const path = require("path");
const multer = require("multer");
const aws = require("aws-sdk");
const fs = require("fs");

aws.config.update({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  region: process.env.aws_region,
});

const s3Uploader = function (req, res) {
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
    region: process.env.aws_region,
  });
  const s3 = new aws.S3();
  console.log(req.files);
  const locations = [];
  Object.values(req.files).forEach((file) => {
    const params = {
      ACL: "public-read",
      Bucket: process.env.aws_bucket_name,
      Body: fs.createReadStream(file[0].path),
      Key: file[0].originalname,
    };
    let loc = null;
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error occured while trying to upload to S3 bucket", err);
        res.status(500).send(err.stack);
      }

      if (data) {
        fs.unlinkSync(file[0].path); // Empty temp folder
        loc = data.Location;
        locations.push(loc);
        console.log(locations);
        console.log("AWS Location");
        console.log(loc);
      }
    });
  });
  console.log("##################");
  console.log(locations);
  return locations;
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads", "temp"));
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

module.exports = { upload, s3Uploader };
