/* Codigo SQL de Mysql */

CREATE DATABASE sistema_productos

USE sistema_productos


CREATE TABLE tipos_usuario(
 tipo_usuario_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 tipo_usuario_rol VARCHAR(30) NOT NULL UNIQUE
);


CREATE TABLE usuarios(
 usuario_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 usuario_nombre VARCHAR(30) NOT NULL,
 usuario_apellido VARCHAR(30) NOT NULL,
 usuario_telefono VARCHAR(12) NOT NULL,
 usuario_email VARCHAR(30) NOT NULL UNIQUE,
 usuario_password VARCHAR(255) NOT NULL,
 tipo_usuario_id INT UNSIGNED NOT NULL,
 FOREIGN KEY (tipo_usuario_id) REFERENCES tipos_usuario(tipo_usuario_id)
 ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE proveedores(
 proveedor_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 proveedor_nombre VARCHAR(50) NOT NULL UNIQUE,
 proveedor_telefono VARCHAR(12) NOT NULL,
 proveedor_email VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE productos(
 producto_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 producto_nombre VARCHAR(50) NOT NULL UNIQUE,
 producto_precio FLOAT NOT NULL,
 producto_stock INT NOT NULL,
 proveedor_id INT UNSIGNED NOT NULL,
 FOREIGN KEY (proveedor_id) REFERENCES proveedores(proveedor_id)
 ON DELETE RESTRICT ON UPDATE CASCADE
);


INSERT INTO tipos_usuario(tipo_usuario_rol) VALUES ("Admin"), ("Empleado");


insert into proveedores(proveedor_nombre,proveedor_telefono,proveedor_email) values 
  ("Distribuidora Los Olivos","123456789","dis_losovilos@gmail.com"),
  ("Distribuidora El Sol","124567891","distribuidora_elsol@outlook.com"),
  ("Laboratorio Roble","132456789","lab_roble@gmail.com"),
  ("Laboratorio Verde","142356789","laboratorio_verder@gmail.com"),
  ("La Sante CA","153246789","lsante@gmail.com");

select * from proveedores;


insert into productos(producto_nombre,producto_precio,producto_stock,proveedor_id) values 
  ("Semillas de girasol",50,500,1),
  ("Almendras",100,1000,2),
  ("Alpiste",150,300,1),
  ("Nueces",200,450,2),
  ("Acacia de la india",85,700,5),
  ("Aceite de coco",90,850,4),
  ("Centella asiatica",67,900,3),
  ("Miel de borax",95,745,5),
  ("Aceite de almendras",256,788,4),
  ("Melatonina",198,255,4);


select * from productos;


insert into usuarios(usuario_nombre,usuario_apellido,usuario_telefono,usuario_email,usuario_password,tipo_usuario_id) values 
("Jose","Garcia","1234567890","admin@gmail.com","12345",1),
("Adrian","Guerrero","1324567890","user@gmail.com","12345",2);


select * from usuarios;





