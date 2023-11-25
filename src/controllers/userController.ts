import { Request, Response } from "express";
import { UserModel } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { revokeToken } from "../middleware/authMiddleware";

const userModel = new UserModel();

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName && !email) {
      return res
        .status(400)
        .json({ message: "Please provide username or email" });
    }
    const user = email
      ? await userModel.findByEmail(email)
      : await userModel.findByUsername(userName);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        { userId: user.id },
        process.env.SECRET_JWT_TOKEN,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ token });
    } else {
      const errorMessage = email
        ? "Incorrect email or password"
        : "Incorrect username or password";
      return res.status(401).json({ message: errorMessage });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkUserNameInDB = async (req: Request, res: Response) => {
  try {
    const { userName } = req.body;
    if (userName) {
      const user = await userModel.findByUsername(userName);

      if (user) {
        return res.status(200).json({ exists: false });
      } else {
        return res.status(200).json({ exists: true });
      }
    } else {
      return res.status(400).json({ message: "no username provided" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkEmailInDB = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await userModel.findByEmail(email);

      if (user) {
        return res.status(200).json({ exists: false });
      } else {
        return res.status(200).json({ exists: true });
      }
    } else {
      return res.status(400).json({ message: "no email provided" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, fullName, password, userName } = req.body;
    if (!email || !fullName || !password || !userName) {
      const missingFields = [];
      if (!email) missingFields.push("email");
      if (!fullName) missingFields.push("fullName");
      if (!password) missingFields.push("password");
      if (!userName) missingFields.push("username");

      return res
        .status(400)
        .json({ message: `Missing fields: ${missingFields.join(", ")}` });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.createUser({
      email,
      fullName,
      userName,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { userId: newUser.id },
      process.env.SECRET_JWT_TOKEN,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({ userId: newUser.id, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userName, currentPassword, newPassword } = req.body;
    if (!userName) {
      return res
        .status(400)
        .json({ message: "Provide a username to change the password" });
    }
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Please provide password" });
    }
    const user = await userModel.findByUsername(userName);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    const saltRounds = 20;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    await userModel.updatePassword(user.id, hashedNewPassword);
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return res
        .status(400)
        .json({ message: "Provide a username to delete the Account" });
    }
    const user = await userModel.findByUsername(userName);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.deleteUser(user.id);
    return res
      .status(200)
      .json({ message: "User account deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signout = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }
    revokeToken(token);
    res
      .status(200)
      .json({ message: "Signed out successfully. Clear local storage." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
