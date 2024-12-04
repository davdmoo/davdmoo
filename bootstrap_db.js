// eslint-disable-next-line @typescript-eslint/no-require-imports
const libsql = require("@libsql/client")

// setup local DB
const db = libsql.createClient({
  url: "file:local.db",
})

async function setup() {
  console.log("setting up..")
  try {
    await db.executeMultiple(`
      drop table if exists analytic;
      drop table if exists path;
      create table path (
        id integer primary key not null,
        name text not null,
        visit_count integer not null default 0,
        unique_visit_count integer not null default 0,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp
      );
      create table analytic (
        id integer primary key not null,
        path_id integer not null,
        visitor_id text not null,
        referrer text not null,
        user_agent text not null,
        timestamp timestamp default current_timestamp,
        foreign key (path_id)
          references path (id)
      );
      insert into path (name) values ('/');
      insert into path (name) values ('/experience');
      insert into path (name) values ('/projects');
      insert into path (name) values ('/guest-book');
    `)
    console.log("local DB has been set up")
  } catch (err) {
    console.error(err, "< Error")
    if (err instanceof libsql.LibsqlError) {
      console.error(err.stack)
    }
  }
}

setup()
