create database authority;
use authority;
set names utf8;
drop table if exists tb_user;
create table tb_user(
    id int not null auto_increment primary key,
    username varchar(64) not null,
    password varchar(64) not null,
    email varchar(64)
);
insert into tb_user(username,password,email) values ('bob','bob','bob@gmail.com');
drop table if exists tb_role;
create table tb_role(
    id int not null auto_increment primary key,
    roleName varchar(64) not null
);
insert into tb_role(roleName) values ('管理员'),('审核员'),('信息发布');

drop table if exists tb_menu;
create table tb_menu(
    id int not null auto_increment primary key,
    name varchar(64) not null,
    level varchar(64) not null
);
