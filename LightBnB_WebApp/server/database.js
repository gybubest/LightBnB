const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE LOWER(users.email) = LOWER($1);
  `, [email])
  .then(res => {
    if (res.rows[0]) {
      return res.rows[0];
    } 
    return null;
  })
  .catch(err => console.log(err));
}
exports.getUserWithEmail = getUserWithEmail;

const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE users.id= $1;
  `, [id])
  .then(res => {
    if (res.rows[0]) {
      return res.rows[0];
    } 
    return null;
  })
  .catch(err => console.log(err));
}
exports.getUserWithId = getUserWithId;

const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users(name, email, password)
  VALUES($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then(res => {
    if (res.rows[0]) {
      return res.rows[0];
    } 
    return null;
  })
  .catch(err => console.log(err));
}
exports.addUser = addUser;

/// Reservations
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(` 
  SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `, [guest_id, limit])
    .then(res => {
      if (res.rows) {
        return res.rows;
      } 
      return null;
    })
    .catch(err => console.log(err));
}
exports.getAllReservations = getAllReservations;

/// Properties
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, AVG(rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE properties.active IS TRUE
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND properties.city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND properties.owner_id = $${queryParams.length} `;
  } 

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND properties.cost_per_night >= $${queryParams.length} `;
  } 

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND properties.cost_per_night <= $${queryParams.length} `;
  } 

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND property_reviews.rating >= $${queryParams.length} `;
  } 

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool.query(queryString, queryParams)
  .then(res => res.rows)
  .catch(err => console.log(err));
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
