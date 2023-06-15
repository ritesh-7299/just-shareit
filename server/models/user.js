const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
    },
    friends: { type: [String], default: [] },
    image: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

userSchema.pre("save", async (next) => {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.models.Users || mongoose.model("User", userSchema);

module.exports = Users;
