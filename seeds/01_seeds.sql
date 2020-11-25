INSERT INTO users (name, email, password)
VALUES ('LadyGaga', 'ladygaga@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Alice', 'alice@wonderland.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Andy', 'andy@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active, owner_id)
VALUES ('Downtown condo', 'Description', 'url1', 'url2', 100, 0, 1, 1, 'Canada', 'King Street', 'Toronto', 'Ontario', 'M5H 3Y2', TRUE, 3),
('Big house', 'Description', 'url1', 'url2', 150, 2, 2, 3, 'Canada', 'North York', 'Toronto', 'Ontario', 'M1R 1R1', TRUE, 2),
('Luxurious house', 'Description', 'url1', 'url2', 5000, 5, 11, 10, 'USA', 'Beverly Hills', 'Los Angeles', 'California', '90035', TRUE, 1);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
VALUES ('2018-09-11', '2018-09-26', 1, 3),
('2019-01-04', '2019-02-01', 2, 1),
('2021-10-01', '2021-10-14', 3, 2);

INSERT INTO property_reviews (rating, message, guest_id, property_id, reservation_id)
VALUES (10, 'message', 3, 1, 1),
(8, 'message', 1, 2, 2),
(1, 'message', 2, 3, 3);