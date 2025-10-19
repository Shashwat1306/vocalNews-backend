import bcrypt from 'bcrypt';
export const encryptPassword = async (plainPassword) => {
    console.log(process.env.SALT,'type of',typeof process.env.SALT);
    return bcrypt.hash(plainPassword, parseInt(process.env.SALT));
}
export const compareHash = (plainPassword, dbPassword) => {
    return bcrypt.compare(plainPassword, dbPassword);
}
