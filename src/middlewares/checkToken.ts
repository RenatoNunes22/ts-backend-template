import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("Token is not defined");
}

//Middleware para verificar se o token é válido
export const checkToken = (req: any, res: any, next: any) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Token não fornecido.");
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send("Token inválido.");
    }
    req.userId = decoded.id;
    next();
  });
};
