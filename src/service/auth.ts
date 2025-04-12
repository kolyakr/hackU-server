import admin from "firebase-admin";
import { User } from "../db/models/User";
import { generateJWT, verifyJWT } from "../utils/jwt";

interface UserProfile {
  _id: string;
  email: string;
  fullName: string;
  profilePicture?: string;
}

interface RegisterResponse {
  message: string;
  user: UserProfile;
  token: string;
}

interface LoginResponse {
  message: string;
  user: UserProfile;
  token: string;
}

interface DecodedToken {
  userId: string;
}

export const registerUser = async (
  email: string,
  password: string,
  fullName: string
): Promise<RegisterResponse> => {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    let user = await User.findOne({ firebaseUid: userRecord.uid });
    if (!user) {
      user = new User({
        firebaseUid: userRecord.uid,
        email: userRecord.email,
        fullName,
      });
      await user.save();
    }

    const token = generateJWT(user._id);

    return {
      message: "User registered successfully",
      user: {
        _id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
      },
      token,
    };
  } catch (error) {
    throw new Error("Failed to register user");
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);

    const jwtToken = generateJWT(userRecord.uid);

    const user = await User.findOne({ firebaseUid: userRecord.uid });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      message: "Login successful",
      user: {
        _id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
      },
      token: jwtToken,
    };
  } catch (error) {
    throw new Error("Failed to login user");
  }
};

export const getUserProfile = async (
  token: string
): Promise<{ user: UserProfile }> => {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = verifyJWT(token) as DecodedToken;
    const userId = decoded.userId;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      user: {
        _id: user._id.toString(),
        email: user.email,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
    };
  } catch (error) {
    throw new Error("Failed to fetch user profile");
  }
};
