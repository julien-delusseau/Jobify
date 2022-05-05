import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    throw new BadRequestError("Merci d'entrer votre prénom");
  }
  if (!email) {
    throw new BadRequestError("Merci d'entrer votre adresse email");
  }
  if (!password) {
    throw new BadRequestError("Merci d'entrer votre mot de passe");
  }
  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new BadRequestError("Merci d'entrer votre adresse email");
  }
  if (!password) {
    throw new BadRequestError("Merci d'entrer votre mot de passe");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new UnauthorizedError("Identifiants incorrects");
  }
  const match = await user.decodePassword(password);
  if (!match) {
    throw new UnauthorizedError("Identifiants incorrects");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ token, user });
};

const updateUser = async (req, res) => {
  const { name, email, lastname, location } = req.body;
  if (!name || !email || !lastname || !location) {
    throw new BadRequestError("Merci d'entrer toutes les valeurs");
  }

  const user = await User.findByPk(req.user.userId, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    throw new NotFoundError("Utilisateur introuvable");
  }

  user.set({ email, name, lastname, location });
  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ token, user });
};

export { register, login, updateUser };
