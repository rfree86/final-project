import Bulletin from './bulletin';

const BulletinCollection = Backbone.Collection.extend({
  model: Bulletin,
    url: "https://api.parse.com/1/classes/bulletin",

  parse(response) {
    return response.results
  }
});

export default BulletinCollection;
