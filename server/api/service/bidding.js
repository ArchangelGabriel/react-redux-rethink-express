import r from 'rethinkdb';
import config from 'config';
import xss from 'xss';

function connect() {
  return r.connect(config.get('rethinkdb'));
}

export function getBiddings() {
  return connect()
  .then(conn => {
    return r
    .table('biddings')
    .orderBy(r.desc('created')).run(conn)
    .then(cursor => cursor.toArray());
  });
}

export function addBidding(bidding) {
  return connect()
  .then(conn => {
    bidding.createdAt = new Date();
    return r
    .table('biddings')
    .insert(bidding).run(conn)
    .then(response => {
      return Object.assign({}, bidding, {id: response.generated_keys[0]});
    });
  });
}

export function deleteBidding(id) {
  return connect()
  .then(conn => {
    return r
    .table('biddings')
    .get(id).delete().run(conn)
    .then(() => ({id: id, deleted: true}));
  });
}
