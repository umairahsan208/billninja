DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS groups_users;
-- DROP TABLE IF EXISTS bills CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS users_items;

create table users(
    id SERIAL PRIMARY KEY,
    phone TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(phone)
);

create table groups(
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

create table friends(
       id SERIAL PRIMARY KEY,
       user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
       friend_id INTEGER NOT NULL  REFERENCES users(id) ON DELETE CASCADE,
       UNIQUE (user_id, friend_id)
);

create table groups_users(
        id SERIAL PRIMARY KEY,
        group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE (group_id, user_id)
);

-- create table bills(
--     id SERIAL PRIMARY KEY,
--     name TEXT,
--     total_cost DECIMAL (10, 2),
--     group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE
-- );

create table items(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    cost DECIMAL (10, 2) NOT NULL,
    group_id INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    payer_user_id INTEGER NOT NULL REFERENCES users(id)
);

create table users_items(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    paid BOOLEAN DEFAULT FALSE,
    UNIQUE (user_id, item_id)
);
