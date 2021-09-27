const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const awsUploadImage = require("../utils/aws-upload-image");

function createToken(user, SECRET_KEY, expiresIn) {
  const { id, name, email, username } = user;
  const payload = {
    id,
    name,
    email,
    username,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const { email, username, password } = newUser;

  //revisar si el mail esta en uso
  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("El email ya esta en uso");

  //revisar si el usuario esta en uso
  const foundUserName = await User.findOne({ username });
  if (foundUserName) throw new Error("El Usuario ya esta en uso");

  //encriptar contraseña
  const salt = await bcryptjs.genSaltSync(10);
  newUser.password = await bcryptjs.hash(password, salt);
  //guardar Usuario
  try {
    const user = new User(newUser);
    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
  return null;
}
async function login(input) {
  const { email, password } = input;

  //verificar si el email esta registrado

  const userFound = await User.findOne({ email: email.toLowerCase() });
  if (!userFound) throw new Error("Error en mail o contraseña");

  //verificar contraseña comparandola con bcrypt
  const passwordSuccess = await bcryptjs.compare(password, userFound.password);
  if (!passwordSuccess) throw new Error("Error en mail o contraseña");

  return {
    //(Usuario, secretKey, Expiration)
    token: createToken(userFound, process.env.SECRET_KEY, "56h"),
  };
}

async function getUser(id, username) {
  let user = null;
  if (id) user = await User.findById(id);
  if (username) user = await User.findOne({ username });
  if (!user) throw new Error("El usuario no existe");

  return user;
}

async function updateAvatar(file, ctx) {
  const { id } = ctx.user;

  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const imageName = `avatar/${id}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, imageName);
    await User.findByIdAndUpdate(id, { avatar: result });
    return {
      status: true,
      urlAvatar: result,
    };
  } catch (error) {
    return {
      status: false,
      urlAvatar: null,
    };
  }
}
async function deleteAvatar(ctx) {
  const { id } = ctx.user;
  try {
    await User.findByIdAndUpdate(id, { avatar: "" });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function updateUser(input, ctx) {
  const { id } = ctx.user;

  try {
    if (input.currentPassword && input.newPassword) {
      const userFound = await User.findById(id);
      const passwordSuccess = await bcryptjs.compareSync(
        input.currentPassword,
        userFound.password
      );
      if (!passwordSuccess) throw new Error("Contraseña incorrecta");

      const salt = await bcryptjs.genSaltSync(10);
      const newPasswordCrypt = await bcryptjs.hash(input.newPassword, salt);
      await User.findByIdAndUpdate(id, { password: newPasswordCrypt });
    } else {
      await User.findByIdAndUpdate(id, input);
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function search(search) {
  const users = await User.find({
    name: { $regex: search, $options: "i" },
  });
  return users;
}

module.exports = {
  register,
  login,
  getUser,
  updateAvatar,
  deleteAvatar,
  updateUser,
  search,
};
