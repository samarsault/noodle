const authService = require("./auth.service");

exports.postLogin = async (req, res) => {
  try {
    const token = await authService.login(req.body);
    return res.status(200).json({
      token,
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: `${err}` });
  }
};

exports.postSignUp = async function (req, res) {
  try {
    const token = await authService.createUser(req.body);
    return res.status(200).json({
      token,
    });
  } catch (err) {
    return res.status(401).json({
      message: err.message,
    });
  }
};
