const app = require('./app');
const db = require('./db/database');

async function main() {
  //init server
  await app.listen(app.get('port'));
  console.log('Server on Port ', app.get('port'));

  //config data base
  await db.createDb().catch((err) => {
    console.log(err);
  });
}

main();
