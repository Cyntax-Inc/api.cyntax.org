// Temporary in-memory store
const submissions = [];

function createFormSubmission(data) {
  submissions.push(data);
  for(obj in submissions){
      console.log(JSON.stringify(obj));
    }
  return data;
}

module.exports = {
  createFormSubmission,
  submissions
};
