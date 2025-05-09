create user if not exists "developer"@"localhost" identified by "04011205";
create database bd_api;
grant all on bd_api.*  to "developer"@"localhost";
flush privileges;

use bd_api;

-- drop table if exists lenguajes;
create table lenguajes (
	id int unsigned auto_increment,
    lenguaje varchar(30),
    primary key (id)
);

-- drop table if exists generos;
create table generos (
	id int unsigned auto_increment,
    genero varchar(15),
    primary key (id)
);

-- drop table if exists ciudades;
create table ciudades (
	id int unsigned auto_increment,
    ciudad varchar(50),
    primary key (id)
);

-- drop table if exists usuarios;
create table usuarios (
	id int unsigned auto_increment,
    nombre varchar(30),
    apellido varchar(30),
    documento int unique not null,
    telefono int,
    usuario varchar(20) unique,
    contrasena varchar(20),
    id_genero int unsigned,
    id_ciudad int unsigned,
    primary key (id),
    foreign key (id_genero) references generos(id),
    foreign key (id_ciudad) references ciudades(id)
);

-- drop table if exists lenguaje_usuario;
create table lenguaje_usuario (
	id int auto_increment,
	id_usuario int unsigned,
    id_lenguaje int unsigned,
    primary key (id),
    foreign key (id_usuario) references usuarios(id),
    foreign key (id_lenguaje) references lenguajes(id)
);

select * from lenguaje_usuario where 1 = 1;

insert into ciudades (ciudad) values ('Bucaramanga'), ('Floridablanca'), ('Girón'), ('Piedecuesta'), ('Lebrija');

insert into generos (genero) values ('Masculino'), ('Femenino'), ('Otro');

insert into lenguajes (lenguaje) values ('JAVA'), ('.NET'), ('Python'), ('JavaScript'), ('SQL'), ('PHP');