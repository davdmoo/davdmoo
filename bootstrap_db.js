// eslint-disable-next-line @typescript-eslint/no-require-imports
const libsql = require("@libsql/client")

// setup local DB
const db = libsql.createClient({
  url: "file:local.db",
})

async function bootstrap() {
  console.log("bootstrapping local DB..")

  try {
    await db.executeMultiple(`
      begin transaction;

      drop table if exists guest_message;
      create table guest_message (
        id integer primary key not null,
        message text check(length(message) <= 50) not null,
        visitor_id text check(length(visitor_id) <= 50) not null, visitor_name text check (length(visitor_name) <= 50) not null,
        created_at timestamp not null default current_timestamp,
        updated_at timestamp not null default current_timestamp
      );

      drop table if exists path;
      create table path (
        id integer primary key not null,
        name text not null,
        visit_count integer not null default 0,
        unique_visit_count integer not null default 0,
        created_at timestamp default current_timestamp,
        updated_at timestamp default current_timestamp
      );

      insert into path (name) values ('/');
      insert into path (name) values ('/experience');
      insert into path (name) values ('/projects');
      insert into path (name) values ('/guest-book');

      drop table if exists visitor;
      create table visitor (
        id integer primary key not null,
        fingerprint text check (length(fingerprint) <= 50) not null
      );

      drop table if exists browser;
      create table browser (
        id integer primary key not null,
        name text not null check(length(name) <= 50),
        version text not null check(length(version) <= 50),
        unique(name, version)
      );

      drop table if exists operating_system;
      create table operating_system (
        id integer primary key not null,
        name text not null check(length(name) <= 50),
        version text not null check(length(version) <= 50),
        unique(name, version)
      );

      drop table if exists device;
      create table device (
        id integer primary key not null,
        type text not null check(length(type) <= 50),
        vendor text not null check(length(vendor) <= 50),
        model text not null check(length(model) <= 50),
        unique(type, vendor, model)
      );

      drop table if exists analytic;
      create table analytic (
        id integer primary key not null,
        path_id integer not null,
        browser_id integer,
        os_id integer,
        device_id integer,
        visitor_id text not null,
        referrer text not null,
        user_agent text not null,
        timestamp timestamp default current_timestamp,
        foreign key (path_id)
          references path (id)
          on delete cascade
        foreign key (browser_id)
          references browser (id)
          on delete cascade
        foreign key (os_id)
          references operating_system (id)
          on delete cascade
        foreign key (device_id)
          references device (id)
          on delete cascade
      );

      drop table if exists session;
      create table session (
        id text primary key not null,
        visitor_id text not null,
        session_start timestamp not null default current_timestamp,
        session_end timestamp not null default current_timestamp
      );

      commit;
    `)

    console.log("bootstrapping DB successful - closing DB connection..")
    db.close()
    console.log("DB connection closed")
  } catch (err) {
    console.error(err, "< Error")

    if (err instanceof libsql.LibsqlError) {
      console.error(err.stack, "<<< Libsql Error")
    }
  }
}

bootstrap()
