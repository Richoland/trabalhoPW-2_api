create table predios (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(40) not null, 
	sigla varchar(4) not null 	
);

insert into predios (nome, descricao, sigla) 
values ('Predio 5', 'Predio da Computação', 'P5')
returning codigo, nome, descricao, sigla;

-- criação da tabela salas
create table salas (
	codigo serial primary key, 
	numero integer not null, 
	descricao varchar(40) not null, 
	capacidade integer not null, 
	predio integer not null, 
	foreign key (predio) references predios (codigo)
);


insert into salas (numero, descricao, capacidade, predio) 
values (511, 'Laboratório', 12, 1), (301, 'Sala de aula', 12, 2)
returning codigo, numero, descricao, capacidade, predio;

-- criação da tabela equipamentos
create table equipamentos (
	codigo serial primary key, 
	descricao varchar(40) not null, 
	numero_serie varchar(40) not null, 
	valor numeric(10,2) not null, 
	sala integer not null, 
	foreign key (sala) references salas (codigo)
);

-- inserindo alguns registros na tabela equipamentos
insert into equipamentos (descricao, numero_serie, valor, sala) 
values ('Computador', '123456', 2500.00, 1), ('Computador', '234567', 2500.00, 1);


-- criação da tabela usuários
create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

-- inserindo alguns registros na tabela usuários
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('jorgebavaresco@ifsul.edu.br', '123456', 'A','(54)99984-4348','Jorge Bavaresco'), 
('joao@ifsul.edu.br', '123456', 'U','(54)44484-4348','Joao');
