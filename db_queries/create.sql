CREATE TABLE IF NOT EXISTS users (
    user_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    username VARCHAR(20) NOT NULL, -- use as username
    email VARCHAR(100) NOT NULL UNIQUE, -- use as loginid
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS medialists(
    medialist_id INT(15) PRIMARY KEY AUTO_INCREMENT, 
    user_id INT(11) NOT NULL REFERENCES users(user_id), 
    medialist_title VARCHAR(100) NOT NULL, 
    upvotes INT(20)
);

CREATE TABLE IF NOT EXISTS platforms(
    platform_id INT(5) PRIMARY KEY AUTO_INCREMENT, 
    platform_name VARCHAR(100) NOT NULL, 
    platform_description VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS categories(
    category_id INT(5) PRIMARY KEY AUTO_INCREMENT, 
    category_name VARCHAR(100) NOT NULL, 
    category_description VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS mediaitems(
    mediaitem_id INT(15) PRIMARY KEY AUTO_INCREMENT, 
    mediaitem_title VARCHAR(100) NOT NULL, 
    platform_id INT(5) NOT NULL REFERENCES platforms(platform_id),
    category_id INT(5) NOT NULL REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS medialists_mediaitems(
    medialist_id INT(15) NOT NULL REFERENCES medialists(medialist_id),
    mediaitem_id INT(15) NOT NULL REFERENCES mediaitems(mediaitem_id),
    PRIMARY KEY (medialist_id, mediaitem_id)
);

CREATE TABLE IF NOT EXISTS user_interests(
    user_id INT(11) NOT NULL REFERENCES users(user_id),
    category_id INT(5) NOT NULL REFERENCES categories(category_id),
    PRIMARY KEY (user_id, category_id)
);

CREATE TABLE IF NOT EXISTS user_favourites(
    favourite_id INT(11) PRIMARY KEY AUTO_INCREMENT,
    user_id INT(11) NOT NULL REFERENCES users(user_id),
    medialist_id INT(15) NOT NULL REFERENCES medialists(medialist_id)
);