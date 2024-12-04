const libsql = require("@libsql/client")

// setup local DB
const db = libsql.createClient({
  url: "file:local.db",
})

async function setup() {
  console.log("setting up..")
  await db.executeMultiple(`
    drop table if exists path;
    drop table if exists analytic;
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
      referrer text not null,
      user_agent text not null,
      visitor_id text not null,
      foreign key (path_id)
        references path (id)
    );
  `)
  console.log("local DB has been set up")
}

setup()
