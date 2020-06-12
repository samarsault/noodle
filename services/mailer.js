// Send mail from noreply@bpgc-cte.org
const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "",
  port: 587,
  secure: false, // only port 425
  auth: {
    user: "",
    pass: "",
  },
});

function render(view, locals) {
  const file = path.join(__dirname, "..", "views", "mail", view, ".pug");
  return pug.renderFile(file, locals);
}
(async () => {
  await transporter.sendMail({
    from: "CTE, BITS GOA <noreply@bpgc-cte.org>",
    to: "someone",
    subject: "Subject",
    html: render("hello"),
  });
})();
