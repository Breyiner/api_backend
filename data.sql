create user if not exists "developer"@"localhost" identified by "04011205";
create database bd_api;
grant all on bd_api.*  to "developer"@"localhost";
flush privileges;

use bd_api;

-- drop table if exists lenguajes;
create table lenguajes (
	id int unsigned auto_increment,
    nombre varchar(30),
    primary key (id)
);

-- drop table if exists generos;
create table generos (
	id int unsigned auto_increment,
    nombre varchar(15),
    primary key (id)
);

-- drop table if exists ciudades;
create table ciudades (
	id int unsigned auto_increment,
    nombre varchar(50),
    primary key (id)
);

-- drop table if exists usuarios;
create table usuarios (
	id int unsigned auto_increment,
    nombre varchar(30),
    apellido varchar(30),
    documento bigint unique not null,
    telefono bigint,
    usuario varchar(20) unique,
    contrasena varchar(20),
    genero_id int unsigned,
    ciudad_id int unsigned,
    primary key (id),
    foreign key (genero_id) references generos(id),
    foreign key (ciudad_id) references ciudades(id)
);

-- drop table if exists lenguajes_usuarios;
create table lenguajes_usuarios (
	id int auto_increment,
	usuario_id int unsigned,
    lenguaje_id int unsigned,
    primary key (id),
    foreign key (usuario_id) references usuarios(id),
    foreign key (lenguaje_id) references lenguajes(id)
);

select * from lenguajes_usuarios where 1 = 1;

insert into ciudades (nombre) values ('Bucaramanga'), ('Floridablanca'), ('Girón'), ('Piedecuesta'), ('Lebrija');

insert into generos (nombre) values ('Masculino'), ('Femenino'), ('Otro');

insert into lenguajes (nombre) values ('JAVA'), ('.NET'), ('Python'), ('JavaScript'), ('SQL'), ('PHP');