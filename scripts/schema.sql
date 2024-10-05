CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id varchar(32) PRIMARY KEY,
    name varchar(32) NOT NULL,
    description varchar(280) NOT NULL,
    hashed_password bytea NOT NULL
);

-- insert some users

INSERT INTO users(id, name, description, hashed_password) VALUES (
    'micahdb',
    'Micah Baker',
    'A student that attends SFU and is studying Computing Science.',
    sha256('1234')
);
INSERT INTO users(id, name, description, hashed_password) VALUES (
    'bicwang',
    'Johnny Deng',
    'A student that attends SFU and is studying Computing Science.',
    sha256('1234')
);
INSERT INTO users(id, name, description, hashed_password) VALUES (
    'nakulbansal727',
    'Nakul Bansal',
    'A student that attends SFU and is studying Computing Science.',
    sha256('1234')
);
INSERT INTO users(id, name, description, hashed_password) VALUES (
    'simon',
    'Simon Purdon',
    'A student that attends SFU and is studying Computing Science.',
    sha256('1234')
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    description varchar(280) NOT NULL,
    host_id varchar(32) REFERENCES users(id),
    time varchar(256) NOT NULL
);

-- insert an event

INSERT INTO events(description, host_id, time) VALUES (
    'SFU Surge Stormhacks hackathon for interested Computing Science students.',
    'micahdb',
    'October 5th, 2024'
);

CREATE TABLE invitations (
    user_id varchar(32) REFERENCES users(id),
    event_id int REFERENCES events(id),
    confirmed boolean NOT NULL DEFAULT 'f',
    expires varchar(256) NOT NULL,
    PRIMARY KEY(user_id, event_id)
);

-- create some invitations

INSERT INTO invitations(user_id, event_id, expires) VALUES (
    'bicwang',
    (SELECT MAX(id) FROM events),
    'October 6th, 2024'
);
