CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

insert into blogs (author, url, title) values ('Arto Hellas', 'http://www.artohellas.com/', 'Arto Hellas blog');
insert into blogs (author, url, title) values ('Arto Hellas Jr.', 'http://www.artohellas.com/', 'Arto Hellas Jr. blog');