import db from "#db/client";
const sql = `
INSERT INTO users (phone, password, first_name, last_name) VALUES
('1234567891', 'password1', 'John', 'Doe'),
('0987654322', 'password2', 'Jane', 'Smith'),
('5555555556', 'password3', 'Alice', 'Johnson'),
('7777777777', 'password4', 'Patrick', 'Maine');
INSERT INTO groups (name) VALUES
('Friend'),
('Families'),
('Colleague'),
('other');
INSERT INTO groups_users (group_id, user_id) VALUES
(1, 3),
(1, 4),
(2, 2),
(2, 4),             
(3, 1),
(3, 4);
INSERT INTO items (name, cost, group_id, payer_user_id) VALUES
('Pizza', 60.00, 1, 1),
('Drinks', 40.00, 1, 2),
('Vegetables', 80.00, 2, 1),
('Fruits', 70.00, 2, 3),        
('Notebooks', 120.00, 3, 2),
('Pens', 80.00, 3, 3);  

INSERT INTO users_items (user_id, item_id, paid) VALUES
(1, 1, TRUE),
(2, 1, FALSE),
(1, 2, TRUE),
(2, 2, TRUE),
(1, 3, FALSE),
(3, 3, TRUE),
(1, 4, TRUE),
(3, 4, FALSE),
(2, 5, TRUE),
(3, 5, FALSE),
(2, 6, TRUE),
(3, 6, TRUE);   

insert into friends (user_id, friend_id) values
(1, 2),
(1, 3),
(2, 3);
`;

await db.connect();

async function seed() {}
try {
  await db.query(sql);
  console.log("🌱 Database seeded.");
} catch (err) {
  console.error("Seeding failed.");
  console.error(err);
}

await seed();
await db.end();
