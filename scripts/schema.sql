CREATE TABLE users (
    id varchar(32) PRIMARY KEY,
    name varchar(32) NOT NULL,
    description varchar(280) NOT NULL,
    password varchar(64) NOT NULL
);

-- insert some users

INSERT INTO users(id, name, description, password) VALUES (
    'micahdb',
    'Micah Baker',
    'A student that attends SFU and is studying Computing Science.',
    '1234'
);
INSERT INTO users(id, name, description, password) VALUES (
    'bicwang',
    'Johnny Deng',
    'A student that attends SFU and is studying Computing Science.',
    '1234'
);
INSERT INTO users(id, name, description, password) VALUES (
    'nakulbansal727',
    'Nakul Bansal',
    'A student that attends SFU and is studying Computing Science.',
    '1234'
);
INSERT INTO users(id, name, description, password) VALUES (
    'simon',
    'Simon Purdon',
    'A student that attends SFU and is studying Computing Science.',
    '1234'
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    description varchar(280) NOT NULL,
    host_id varchar(32) REFERENCES users(id),
    time varchar(256) NOT NULL,
    attendees int,
    attendees_found int
);

-- insert an event

INSERT INTO events(description, host_id, time, attendees, attendees_found) VALUES (
    'SFU Surge Stormhacks hackathon for interested Computing Science students.',
    'micahdb',
    'October 5th, 2024',
    '2',
    '0'
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
