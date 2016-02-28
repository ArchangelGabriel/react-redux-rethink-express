import r from 'rethinkdb';
import config from 'config';
import xss from 'xss';

function connect() {
  return r.connect(config.get('rethinkdb'));
}

export function replaceUser(user) {
  return connect()
  .then(conn => {
    user.createdAt = new Date();
    return r
    .table('users')
    .get(user.id)
    .replace(user, {returnChanges: true}).run(conn)
    .then(result => result.changes[0].new_val);
  })
}

export function getUser(id) {
  return connect()
  .then(conn => {
    return r
    .table('users')
    .get(id).run(conn);
  });
}
