const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require('../models/queryModels');
import { Request, Response } from 'express';

const signupUser = async (req: Request, res: Response) => {
  console.log('request to signup user', req.body);
  try {
    const { firstName, lastName, email, password } = req.body;
    const firstName1 = String(firstName);
    const lastName1 = String(lastName);
    const email1 = String(email);
    const password1 = String(password);
    // check that all fields have been provided
    if (!firstName1 || !lastName1 || !email1 || !password1) {
      res.status(400).json({ error: 'Please add all required fields' });
      return;
    }

    // check if user already exists
    const text = `SELECT * FROM USERS WHERE EMAIL= $1`;
    const params = [email1];
    const result = await client.query(text, params);
    // const userExists = result.rows[0];
    // console.log(userExists);
    if (result.rows.length !== 0) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    // hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password1, salt);

    // create user
    // console.log(`generated hashedpassword is ${hashedPassword}`)
    const textInsert = `INSERT INTO users (firstname, lastname, email, password)
     VALUES ($1,$2,$3,$4)
     RETURNING *`;
    const paramsInsert = [firstName1, lastName1, email1, hashedPassword];

    const resultInsert = await client.query(textInsert, paramsInsert);
    if (resultInsert.rowCount !== 1) {
      throw 'Insert new user failed!';
    }

    const user = resultInsert.rows[0];
    if (user) {
      res.status(201).json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const signinUser = async (req: Request, res: Response) => {
  console.log('request to signin user', req.body);
  const { email, password } = req.body;

  try {
    const text = `SELECT * FROM USERS WHERE EMAIL= $1`;
    const params = [email];
    console.log('in signin user try block');
    const result = await client.query(text, params);
    console.log('RESULT:', result);
    // console.log(result)
    console.log(result.rowCount);
    if (result.rowCount === 0) {
      return res.status(400).json({ error: 'User not found' });
    }
    const user = result.rows[0];
    // console.log(user.password)
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({
      _id: user._id,
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      cache_id: user.cache_id,
      config_id: user.config_id,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'signInUser Error' });
  }
};

const generateToken = (id: number) => {
  return jwt.sign({ id }, 'abc123', { expiresIn: '30' });
};

module.exports = { signupUser, signinUser };
