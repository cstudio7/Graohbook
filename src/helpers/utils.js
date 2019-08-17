import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/**
 * @param {string} password
 * @return {string} hash
 */
export const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * @param {string} id
 * @param {string} isAdmin
 * @param {string} tokenExpiryDate
 * @param {string} secret
 * @param {string} email
 * @return {string} token
 */
export const tokenGenerator = (id, isAdmin, tokenExpiryDate = '1h', secret = 'secret', email) => {
  const payload = { id, isAdmin };
  if (email) {
    payload.email = email;
  }
  const token = jwt.sign(payload, secret, { expiresIn: tokenExpiryDate });
  return token;
};

/**
 * @param {string} hashPwd
 * @param {string} password
 * @return {string} hash
 */
export const comparePassword = (hashPwd, password) => bcrypt.compareSync(password, hashPwd);
