INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES (NULL, 'arohan', 'radhyapak2@student.gsu.edu', '4e8e0c47b55c9b6157cef797077b279f');


INSERT INTO `platforms` (`platform_id`, `platform_name`, `platform_description`) VALUES (1, 'Netflix', 'Netflix is an OTT media platform'), (2, 'Goodreads', 'Goodreads is a database of books, annotations, quotes, and reviews');

INSERT INTO `categories` (`category_id`, `category_name`, `category_description`) VALUES (1, 'Movies', 'motion pictures'), (2, 'TV Series', NULL), (3, 'Books', NULL), (4, 'Comics', NULL), (5, 'Anime', NULL);

INSERT INTO `medialists` (`medialist_id`, `user_id`, `medialist_title`, `upvotes`) VALUES (1, '1', 'Books I read in 2021', '121'), (2, '1', 'My favorite Superhero Movies', '78');
INSERT INTO `mediaitems` (`mediaitem_id`, `mediaitem_title`, `platform_id`, `category_id`) VALUES (1, 'Kane and Abel', '2', '3'), (2, 'The Prodigal Daughter', '2', '3'), (3, 'Powershift', '2', '3');
INSERT INTO `medialists_mediaitems` (`medialist_id`, `mediaitem_id`) VALUES ('1', '1'), ('1', '2'), ('1', '3'), ('2', '4');
INSERT INTO `mediaitems` (`mediaitem_id`, `mediaitem_title`, `platform_id`, `category_id`) VALUES (4, 'Avengers: Endgame', '1', '1'), (5, 'The Dark Knight', '1', '1');
