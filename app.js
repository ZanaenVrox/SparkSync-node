import connectDB from "./backend/config/database.js";
import User from "./backend/models/user.js";
import UserAdmin from "./backend/models/useradmin.js";
import RoleHasPermission from "./backend/models/rolehaspermission.js";
import Permission from "./backend/models/permission.js";
import Role from "./backend/models/role.js";

import userAdminRouter from "./backend/adminRoutes/userAdminRoute.js";
import userRouter from "./backend/adminRoutes/userRoute.js";
import frontimageRouter from "./backend/adminRoutes/frontimageRoute.js";
import backimageRouter from "./backend/adminRoutes/backimageRoute.js";
import dataRouter from "./backend/adminRoutes/dataRoute.js";
import rolesRouter from "./backend/adminRoutes/roleRoute.js";
import permissionRouter from "./backend/adminRoutes/permissionRoute.js";
import rolepermissionRouter from "./backend/adminRoutes/rolepermissionRoute.js";
import userPropertyRouter from "./backend/adminRoutes/userPropertiesRoutes.js";

import auth from "./backend/middleware/auth.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import twilio from "twilio";

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
dotenv.config();
connectDB();

///////OTP//////
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

//////Send OTP Via Phone Number
const accountSid = "AC24a5e4fd2fb8de8b766dc9902381e175";
const authToken = "fb0d4e19e81ef819a1d783442a231059";
const twilioPhone = "+12565488680";

const client = twilio(accountSid, authToken);

function sendOTPBySMS(user) {
  client.messages
    .create({
      body: `Your OTP for login is: ${user.otp}`,
      from: twilioPhone,
      to: "+923048685312",
    })
    .then((message) => console.log("OTP sent to phone"))
    .catch((error) => console.error(error));
}

///////Send OTP via email//////
function sendOTPByEmail(user) {
  console.log('User email:', user);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "zanaen@vrox.co.uk",
      pass: "aijhgnpctnkjnsdc",
    },
  });
  const mailOptions = {
    from: 'noreply@sparksync.com', // Replace with your no-reply address
    to: user.email,
    subject: "Your Secure OTP for Login",
    // text: `Your OTP for login is: ${user.otp}`,
    text: `
    Hi ${user.name},
    
    For added security, here's your One-Time Password (OTP) to log in:
    OTP: ${user.otp}
    Please use it promptly to access your account securely.
    
    Thanks,
    SparkSync Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error(error);
    } else {
      console.log("OTP sent to email");
    }
  });
}

const secretKey = "abdabdabdabdabdabdabd";
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  //  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};

///////Signup User//////

app.post("/api/v1/user/register", async (req, res) => {
  const { name, email, phone_number, password } = req.body;

  console.log(req.body);

  // Check if the user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res
      .status(201)
      .json({ message: "User with this email already exist!" });
  }

  const otp = generateOTP();
  const iddd = await User.find().sort({ id: -1 }).limit(1);

  let idd = 0;
  if (iddd.length > 0 && iddd[0].id) {
    idd = iddd[0].id;
  }
  var incId = idd + 1;
  const newUser = new User({
    id: incId,
    name,
    email,
    phone_number,
    password: bcrypt.hashSync(password, 10),
    otp,
    isVerified: false,
  });

  await newUser.save();

  if (newUser.email) {
    sendOTPByEmail(newUser);
    res.status(200).json({
      message: "Successfully Registered, OTP sent to your email",
      newUser,
    });
  } else {
    res.status(400).json({ error: "User email not defined" });
  }
});

///////Verify Registration OTP//////
app.post("/api/v1/user/verify-registration", async (req, res) => {
  const { otp } = req.body;

  const user = await User.findOne({ otp: parseInt(otp, 10) });

  // if (!user) {
  //   return res.status(404).json({ error: 'Invalid OTP' });
  // }

  if (user.isVerified) {
    return res.status(400).json({ error: "User is already verified" });
  }

  // Check if the provided OTP matches the stored OTP
  if (user.otp === parseInt(otp, 10)) {
    // Update user verification status
    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: "Email verification successful" });
  } else {
    return res.status(401).json({ error: "Invalid OTP" });
  }
});

///////Login User//////
app.post("/api/v1/user/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const otp = generateOTP(); // Generate a new OTP
  user.otp = otp;

  await user.save();

  if (user.email) {
    sendOTPByEmail(user);
    res.status(200).json({
      message: "Successfully Logged In, OTP sent to your email",
      user,
    });
  } else {
    res.status(400).json({ error: "User email not defined" });
  }
});

///////OTP Verification//////

app.post("/api/v1/user/verify", async (req, res) => {
  const { otp } = req.body;

  const user = await User.findOne({ otp: parseInt(otp, 10) });

  if (!user) {
    return res.status(401).json({ error: "Invalid OTP" });
  }

  // user.isVerified = true;
  user.otp = null; // Clear OTP after verification

  await user.save();

  const token = jwt.sign({ email: user.email }, "secretKey", {
    expiresIn: "1h",
  });

  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 3600000;

  await user.save();

  res.status(200).json({ token });
});

//////////// Resend OTP route/////
app.post("/api/v1/user/resend-otp", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  const otp = generateOTP(); // Generate a new OTP
  user.otp = otp;

  await user.save();

  sendOTPByEmail(user);
  res.status(200).json({ message: "OTP sent to your email" });
});

///// Forgot Password/////
// app.post('/api/v1/user/forgot-password', async (req, res) => {
//   const { email } = req.body; // Identifier can be an email or phone number
//   const user = await User.findOne({ email });
//   //console.log(user);

//   if (!user) {
//     return res.status(400).json({ error: 'User not found' });
//   }

//   if (!user.email) {
//     return res.status(400).json({ error: 'User email not defined' });
//   }

//   const otp = generateOTP();
//   user.otp = otp;
//   await user.save();

//   if (user.email) {
//     sendOTPByEmail(user);
//     res.status(200).json({ message: 'OTP sent to your email' });
//   } else {
//     console.log('User email not defined:', user);
//     res.status(400).json({ error: 'User email not defined' });
//   }
// });

app.post("/api/v1/user/forgot-password", async (req, res) => {
  const { identifier } = req.body; // Identifier can be an email or phone number
  const user = await User.findOne({
    $or: [{ email: identifier }, { phone_number: identifier }],
  });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  if (!user.email && !user.phone_number) {
    return res
      .status(400)
      .json({ error: "User email and phone number not defined" });
  }

  const otp = generateOTP();
  user.otp = otp;
  await user.save();

  // console.log(user);

  if (user.email) {
    sendOTPByEmail(user);
  }

  if (user.phone_number) {
    sendOTPBySMS(user);
  }

  res
    .status(200)
    .json({ message: "OTP sent to your email and/or phone number" });
});

///////////Reset Password///////
app.post("/api/v1/user/reset-password", async (req, res) => {
  const { newPassword, confirmPassword, email } = req.body;
  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "Password and confirm password do not match" });
  }

  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      console.error("User not found or invalid reset token");
      return res
        .status(400)
        .json({ error: "User not found or invalid reset token" });
    }

    // Clear the resetToken and resetTokenExpires after resetting the password
    user.password = bcrypt.hashSync(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//////////User Logout//////

app.post("/api/v1/user/logout", authenticateUser, (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
});

//////////////Admin User/////////

const SecretKey = "abdabdabdabdabdabdabd";

/////// Signup////////
app.post("/api/vi/useradmin/signup", async (req, res) => {
  const { username, name, email, phone_number, password } = req.body;

  // Check if the username already exists
  const existingUser = await UserAdmin.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using a Mongoose model (you'll need to define UserModel)
    const iddd = await UserAdmin.find().sort({ id: -1 }).limit(1);
    let idd = 0;
    if (iddd.length > 0 && iddd[0].id) {
      idd = iddd[0].id;
    }
    var incId = idd + 1;
    const newUser = new UserAdmin({
      id: incId,
      username,
      name,
      email,
      phone_number,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/v1/useradmin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by username using the UserAdmin model
    const user = await UserAdmin.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//// Image API
app.use("/profile_image", express.static("public/uploads/user"));
app.use("/front_image", express.static("public/uploads/frontimages"));
app.use("/back_image", express.static("public/uploads/backimages"));

////////////// Routes
app.use("/api/v1/frontimage", frontimageRouter);
app.post("/api/v1/user_properties", userPropertyRouter);
app.use("/api/v1/backimage", backimageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/vi/useradmin", userAdminRouter);
app.use("/api/v1/data", dataRouter);
app.use("/api/v1/roles", rolesRouter);
app.use("/api/v1/permission", permissionRouter);
app.use("/api/v1/roleperimssion", rolepermissionRouter);

export default app;
