import { env } from "../../env.config.js";

export const models = `
CREATE TABLE IF NOT EXISTS users (
    id int auto_increment primary key,
    user_name varchar(100) not null ,
    email varchar(100) unique not null,
    password varchar(200) not null,
    role ENUM('Customer','Admin') not null default 'Customer',
    created_at timestamp default current_timestamp(),
    updated_at timestamp default current_timestamp() on update current_timestamp(),
    is_delete BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS wallets (
    id int auto_increment primary key,
    user_id int not null unique,
    balance decimal(15,2) default 0.00,
    created_at timestamp default current_timestamp(),
    updated_at timestamp default current_timestamp() on update current_timestamp(),
    constraint fk_user_wallet FOREIGN KEY (user_id) REFERENCES users(id) on delete cascade 
);
`;
