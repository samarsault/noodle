const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    lowercase: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
  },
  bits_id: {
    type: String,
    match: /\d{4}(PH|[ABH](A|B|[0-9]))(PS|TS|PX|([ABH]|[0-9])(A|B|[0-9]))\d{4}[GHP]/,
    // match: /\d{4}[ABH](A|[0-9])(PS|([ABH]|[0-9])(A|[0-9]))\d{4}[GHP]/,
  },
  phone: {
    type: String,
    match: /\d{10}/,
  },
  role: {
    type: String,
    enum: ["admin", "student"],
    default: "student",
  },
  created: Date,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// Adds User.paginate({})
UserSchema.plugin(mongoosePaginate);

module.exports = model("User", UserSchema, "users");
