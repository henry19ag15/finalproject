require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pg15`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User,Post,Comment,Followings, Follower,Likes } = sequelize.models; //creo que deberia estar este modelo

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// User.belongsTo(Community);
// Community.hasMany(User);

User.hasMany(Post,{ foreignKey:"autorId"} );
Post.belongsTo(User, {as: "autor"});


Comment.belongsTo(Post)
Post.hasMany(Comment)

//Usuario va a tener muchos comentarios
//Se añade una  clave uerId a la tabla posts
User.hasMany(Comment, {as: "comments", foreingKey: "autorid"})  //de uno a N

//Se añade una clave  userId a la tabla posts
Comment.belongsTo(User, {as: "autor"})

// Likes.belongsTo(Post)
// Post.hasMany(Likes)

User.hasMany(Follower, {as: "follower", foreignKey: "follower_Id"})
Follower.belongsTo(User)

// User.hasMany(Followings, {as: "followin", foreignKey : "autor_Id"})
// Followings.belongsTo(User, {as: "autor"})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
