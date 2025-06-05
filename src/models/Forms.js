// Temporary in-memory store
const submissions = [];

function createFormSubmission(data) {
  submissions.push(data);
  return data;
}

module.exports = {
  createFormSubmission,
  submissions
};
