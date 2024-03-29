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

const s3Uploader = async function (req, res) {
  // Set AWS Config
  const AWS_Present =
    !!process.env.aws_access_key_id &&
    !!process.env.aws_secret_access_key &&
    !!process.env.aws_region;
  if (!AWS_Present) {
    const result = [];
    Object.values(req.files).forEach((file) => {
      result.push(`/upload${file[0].path.split("/upload")[1]}`);
    });
    return result[0];
  }
  aws.config.setPromisesDependency();
  aws.config.update({
    accessKeyId: process.env.aws_access_key_id,
    secretAccessKey: process.env.aws_secret_access_key,
    region: process.env.aws_region,
  });

  const s3 = new aws.S3();
  const locations = [];
  const dataPromises = Object.values(req.files).map((file) => {
    const params = {
      ACL: "public-read",
      Bucket: process.env.aws_bucket_name,
      Body: fs.createReadStream(file[0].path),
      Key: file[0].filename,
    };

    const prom = s3.upload(params).promise();
    fs.unlinkSync(file[0].path); // Empty temp folder
    return prom;
  });
  const datas = await Promise.all(dataPromises);
  datas.forEach((data) => {
    try {
      locations.push(data.Location);
    } catch (e) {
      console.log("Error occured while trying to upload to S3 bucket", e);
      res.status(500).send(e.stack);
    }
  });
  return locations[0];
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(__dirname, "temp"));
    },
    filename(req, file, cb) {
      const name = req.params.fileName ? `${req.params.fileName}-` : "";
      cb(
        null,
        `${name}${path.basename(
          file.originalname,
          path.extname(file.originalname)
        )}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

module.exports = { upload, s3Uploader };
