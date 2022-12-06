INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES (1, 'arohan', 'testuser1@gsu.edu', 'e99a18c428cb38d5f260853678922e03');
INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES (2, 'rohan221', 'testuser2@gsu.edu', 'e99a18c428cb38d5f260853678922e03');

INSERT INTO `platforms` (`platform_id`, `platform_name`, `platform_description`) VALUES
(1, 'Netflix', 'Netflix is an OTT media platform'),
(2, 'Goodreads', 'Goodreads is a database of books, annotations, quotes, and reviews'),
(3, 'Disney+', 'For Marvel'),
(4, 'Prime Video', 'Amazon video');

INSERT INTO `categories` (`category_id`, `category_name`, `category_description`) VALUES
(1, 'Movies', 'motion pictures'),
(2, 'TV Series', NULL),
(3, 'Books', NULL);

INSERT INTO `mediaitems` (`mediaitem_id`, `mediaitem_title`, `platform_id`, `category_id`) VALUES
(1, 'Kane and Abel', 2, 3),
(2, 'The Prodigal Daughter', 2, 3),
(3, 'Powershift', 2, 3),
(4, 'Avengers: Endgame', 1, 1),
(5, 'The Batman', 1, 1),
(6, 'To Kill a Mockingbird', 2, 3),
(7, 'The Firm', 2, 3),
(8, 'Doctor Strange', 3, 1),
(9, 'Stranger Things', 1, 2),
(10, 'Narcos', 1, 2),
(11, 'Black Mirror', 1, 2),
(12, 'Breaking Bad', 1, 2),
(13, 'The Godfather', 4, 1),
(14, 'A Beautiful Mind', 4, 1),
(15, 'The Pursuit of Happyness', 4, 1);

INSERT INTO `medialists` (`medialist_id`, `user_id`, `medialist_title`, `upvotes`) VALUES
(1, 1, 'Books I read in 2022', 0);

INSERT INTO `medialists_mediaitems` (`medialist_id`, `mediaitem_id`) VALUES ('1', '1');