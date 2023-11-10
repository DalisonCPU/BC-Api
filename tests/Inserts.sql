INSERT INTO "Account" ("email", "password", "language", "creationDate")
VALUES ('fred@gmail.com', 'senha123', 'pt', '2023-10-30 12:34:56');

INSERT INTO "Player" ("name", "gender", "account_id")
VALUES ('Fred', 0, 'fred@gmail.com');
INSERT INTO "PlayerVariable" ("name", "type") VALUES
('mana', 0),
('hp', 0),
('personal_msg', 1);
INSERT INTO "PlayerData" ("player_id", "variable_id", "value") VALUES
(1, 1, '750.00'),
(1, 2, '50000.00'),
(1, 3, 'Como pode 5*5*0.2 ser 5?');



--Outro jgoador e variáveis
INSERT INTO "Player" ("name", "gender", "account_id")
VALUES ('Freddie', 0, 'fred@gmail.com');
INSERT INTO "PlayerVariable" ("name", "type") VALUES
('mana', 0),
('hp', 0),
('personal_msg', 1);
INSERT INTO "PlayerData" ("player_id", "variable_id", "value") VALUES
(2, 4, '655.00'),
(2, 5, '120000.00'),
(2, 6, 'Gatuno nato');
