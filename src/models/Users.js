const users = [];

function createUser(userData) {
  users.push(userData);
  return userData;
}

function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

module.exports = {
  users,
  createUser,
  findUserByEmail
};
