import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbClient } from "../db";
import { User } from "../models/userModel";

dotenv.config();

const { JWT_SECRET, DB_NAME } = process.env;

if (!JWT_SECRET) {
  throw new Error("Token is not defined");
}

if (!DB_NAME) {
  throw new Error("DB_NAME is not defined");
}

//Função para criar um novo usuário
export const CreateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, cpf, name, dn, telephone, password } = req.body as User;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      cpf,
      name,
      dn,
      telephone,
      password: hashedPassword,
    };
    const token = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const userExists = await checkUser(email);

    if (userExists.length > 0) {
      res.send("Usuário já existe!");
    } else {
      dbClient
        .db(DB_NAME)
        .collection("users")
        .insertOne({ ...user, token })
        .then(() => {
          res.json("Usuário criado com sucesso!");
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  } catch (error) {
    console.error("Erro ao criar usuário", error);
    res.status(500).json({ error: "Erro interno ao criar usuário" });
  }
};

//Função para buscar todos os usuários
export const AllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await dbClient
      .db(DB_NAME)
      .collection("users")
      .find()
      .toArray();
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    res.status(500).json({ error: "Erro interno ao buscar usuários" });
  }
};

//Função para realizar o login
export const LonginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await checkUser(email);

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

export const checkUser = async (email: string) => {
  return await dbClient
    .db(DB_NAME)
    .collection("users")
    .aggregate([
      {
        $match: {
          email: email,
        },
      },
    ])
    .toArray();
};
