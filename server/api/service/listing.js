import r from 'rethinkdb';
import config from 'config';
import xss from 'xss';

function connect() {
  return r.connect(config.get('rethinkdb'));
}

export function getListings() {
  return connect()
  .then(conn => {
    return r
    .table('listings')
    .orderBy(r.desc('created')).run(conn)
    .then(cursor => cursor.toArray());
  });
}

export function addListing(listing) {
  return connect()
  .then(conn => {
    listing.createdAt = new Date();
    return r
    .table('listings')
    .insert(listing).run(conn)
    .then(response => {
      return Object.assign({}, listing, {id: response.generated_keys[0]});
    });
  });
}

export function deleteListing(id) {
  return connect()
  .then(conn => {
    return r
    .table('listings')
    .get(id).delete().run(conn)
    .then(() => ({id: id, deleted: true}));
  });
}
