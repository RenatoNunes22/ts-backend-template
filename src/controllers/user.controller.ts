import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbClient } from "../db";
import { User } from "../models/userModel";

dotenv.config();

const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

if (!JWT_SECRET || !REFRESH_TOKEN_SECRET) {
  throw new Error("Token is not defined");
}

export const CreateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, dn, password } = req.body as User;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      name,
      dn,
      password: hashedPassword,
    };
    const token = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ user }, REFRESH_TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    dbClient
      .db("teste")
      .collection("users")
      .insertOne({ ...user, token, refreshToken })
      .then(() => {
        res.json("Usuário criado com sucesso!");
      })
      .catch((error) => {
        throw new Error(error);
      });
    //res.json({ ...user, token, refreshToken });
  } catch (error) {
    console.error("Erro ao criar usuário", error);
    res.status(500).json({ error: "Erro interno ao criar usuário" });
  }
};

export const AllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await dbClient
      .db("teste")
      .collection("users")
      .find()
      .toArray();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    res.status(500).json({ error: "Erro interno ao buscar usuários" });
  }
};

export const LonginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, password } = req.body;
    const user = await dbClient
      .db("teste")
      .collection("users")
      .aggregate([
        {
          $match: {
            name: name,
          },
        },
      ])
      .toArray();

    if (!user) {
      res.status(401).json({ error: "Usuário não encontrado" });
    } else {
      await bcrypt.compare(password, user[0].password).then((result) => {
        if (!result) {
          res.status(401).json({ error: "Credenciais inválidas" });
        }
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
