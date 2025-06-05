const tickets = [];

function addTicket(data) {
  tickets.push(data);
  return data;
}

module.exports = {
  addTicket,
  tickets
};
