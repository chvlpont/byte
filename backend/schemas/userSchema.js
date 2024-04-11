import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

// Defining the schema for user
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual property for displaying the user's full name
userSchema.virtual("displayName").get(function () {
  return this.firstName + " " + this.lastName;
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Pre-save hook to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) {
    next();
  }

  const salt = await bcrypt.genSalt(15);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt); // Hashing the password using bcrypt
});

const User = model("User", userSchema);

export default User;
