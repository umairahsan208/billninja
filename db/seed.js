// INSERT INTO bills (name, total_cost, group_id) VALUES
// ('Dinner', 100.00, 1),
// ('Groceries', 150.00, 2),
// ('Office Supplies', 200.00, 3);

import db from "#db/client";
const sql = `
INSERT INTO users (phone, password, first_name, last_name) VALUES
('1234567890', 'password1', 'John', 'Doe'),
('0987654321', 'password2', 'Jane', 'Smith'),
('5555555555', 'password3', 'Alice', 'Johnson');
INSERT INTO groups (name) VALUES
('Friends'),
('Family'),
('Colleagues');
INSERT INTO groups_users (group_id, user_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),             
(3, 2),
(3, 3);
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