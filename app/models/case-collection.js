import Case from './case';

var CaseCollection = Backbone.Collection.extend({
  model: Case,
  url: "https://api.parse.com/1/classes/client?include=dob",
  parse(response) {
    return response.results;
  }
});

export default CaseCollection;
