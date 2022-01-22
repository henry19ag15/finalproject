require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");


const sequelize = new Sequelize(
  process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
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
const { User, Post, Comment, Following, Follower, Like, Suscriber, Suscripto,Notification } = sequelize.models;

////////////////////////////////// RELACIONES/////////////////////////////////////////

////////////////USER-POST
User.hasMany(Post, { onDelete: 'cascade',foreignKey: "autorId" });
Post.belongsTo(User, { onDelete: 'CASCADE'});

////////////////COMMENT-POST
Comment.belongsTo(Post, { onDelete: 'CASCADE', foreingKey: "post_id" })
Post.hasMany(Comment, { onDelete: 'CASCADE'})

///////////////USER-COMMENT
User.hasMany(Comment, { onDelete: 'CASCADE',foreingKey: "userId" })
Comment.belongsTo(User, { onDelete: "CASCADE" })

///////////////LIKE-POST
Post.hasMany(Like, { onDelete: 'CASCADE' })
Like.belongsTo(Post, { onDelete: 'CASCADE', foreingKey: "post_id" })


////////////////USER-LIKE
User.hasMany(Like, { onDelete: 'CASCADE',  foreingKey: "autorId" })  
Like.belongsTo(User, { onDelete: 'CASCADE'})

 ///////////////USER-FOLLOWER
User.hasMany(Follower, { onDelete: 'CASCADE', foreignKey: "follower_Id" })
Follower.belongsTo(User, { onDelete: 'CASCADE' })
///////////////USER-FOLLOWING
User.hasMany(Following, { onDelete: 'CASCADE', foreignKey: "followin_Id" })
Following.belongsTo(User, { onDelete: 'CASCADE'})

///////////////USER-SUSCRIBERS
User.hasMany(Suscriber, { onDelete: 'CASCADE', foreignKey: "suscriber_Id" })
Suscriber.belongsTo(User, { onDelete: 'CASCADE' })
///////////////USER-SUSCRIBED
User.hasMany(Suscripto, { onDelete: 'CASCADE', foreignKey: "suscripto_Id" })
Suscripto.belongsTo(User, { onDelete: 'CASCADE'})
///////////////USER-NOTIFICATION
User.hasMany(Notification, { onDelete: 'CASCADE', foreignKey: "notification_Id" })
Notification.belongsTo(User, { onDelete: 'CASCADE'})


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
