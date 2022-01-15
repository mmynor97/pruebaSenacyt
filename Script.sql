
/*
	CAT_AREA_DESEMPENIO
*/
CREATE TABLE cat_area_desempenio (
    cod_area_desempenio  INT PRIMARY KEY NOT NULL,
    nom_area_desempenio  VARCHAR(100) NOT NULL,
    cod_estado_registro  INT(1) NOT NULL
);

ALTER TABLE cat_area_desempenio
    ADD CONSTRAINT rl_est_reg_cat_desmp FOREIGN KEY ( cod_estado_registro )
        REFERENCES cat_estado_registro ( cod_estado_registro );

INSERT INTO cat_area_desempenio
VALUES (1,'Ciencias de la computación', 1),
		 (2,'Psicología',1),
		 (3,'Ciencencias Econónmicas',1),
		 (4,'Ingeniería en Sistemas',1),
		 (5,'Recursos Humanos',1);

/*
	CAT_ESTADO_REGSITRO
*/

CREATE TABLE cat_estado_registro (
    cod_estado_registro  int NOT NULL PRIMARY KEY,
    nom_estado_registro  VARCHAR(50) NOT NULL
);

INSERT INTO cat_estado_registro
VALUES (0,'ELIMINADO'),
(1,'ACTIVO');

/*
	CAT_INSTITUTO_TITULO
*/
CREATE TABLE cat_instituto_titulo (
    cod_instituto        INT NOT NULL PRIMARY KEY,
    nom_institucion      VARCHAR(50) NOT NULL,
    cod_estado_registro  INT(1) NOT NULL
);


ALTER TABLE cat_instituto_titulo
    ADD CONSTRAINT rl_est_inst_titu FOREIGN KEY ( cod_estado_registro )
        REFERENCES cat_estado_registro ( cod_estado_registro );
		
INSERT INTO cat_instituto_titulo
VALUES (1,'Universidad San Carlos', 1),
		 (2,'Universidad del Valle',1),
		 (3,'Universidad Rafael Landivar',1),
		 (4,'Universidad Galileo',1),
		 (5,'Universidad Mariano Galvez',1);
		

/*
	CAT_LOGROS_ACADEMICOS
*/
CREATE TABLE cat_logros_academicos (
    cod_logro_academico  INT NOT NULL PRIMARY KEY,
    titulo_programa      VARCHAR(100) NOT NULL,
    cod_estado_registro  INT(1) NOT NULL
);

ALTER TABLE cat_logros_academicos
    ADD CONSTRAINT rl_est_reg_academ FOREIGN KEY ( cod_estado_registro )
        REFERENCES cat_estado_registro ( cod_estado_registro );
		
INSERT INTO cat_logros_academicos
VALUES (1,'Licenciatura en Pedagogía', 1),
		 (2,'Ingeniería Industrial',1),
		 (3,'Diplomado en Computación',1),
		 (4,'Maestría en orientación educativa',1),
		 (5,'Licenciatura en derecho',1);

/*
	CAT_DATOS_PERSONALES
*/
CREATE TABLE datos_personales (
    cod_personal         INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    per_nom1             VARCHAR(50) NOT NULL,
    per_nom2             VARCHAR(50),
    per_apellido1        VARCHAR(50) NOT NULL,
    per_apellido2        VARCHAR(50),
    fec_nacimiento       DATE NOT NULL,
    cod_estado_registro  INT(1) NOT NULL
);

ALTER TABLE datos_personales
    ADD CONSTRAINT rl_est_registro_per FOREIGN KEY ( cod_estado_registro )
        REFERENCES cat_estado_registro ( cod_estado_registro );


/*
	DET_AREAS_DESEMPENIO
*/
CREATE TABLE det_areas_desempenio(
    cod_personal         INT NOT NULL PRIMARY KEY,
    cod_area_desempenio  INT NOT NULL,
    cod_estado_registro  INT(1) NOT NULL
);

ALTER TABLE det_areas_desempenio
    ADD CONSTRAINT rl_est_reg_area_desmp FOREIGN KEY ( cod_area_desempenio )
        REFERENCES cat_area_desempenio ( cod_area_desempenio );
		
ALTER TABLE det_areas_desempenio
    ADD CONSTRAINT rl_est_reg_demp_per FOREIGN KEY ( cod_personal )
        REFERENCES datos_personales ( cod_personal );
		
ALTER TABLE det_areas_desempenio
    ADD CONSTRAINT rl_est_reg_det_desemp FOREIGN KEY ( cod_estado_registro )
        REFERENCES cat_estado_registro ( cod_estado_registro );

/*
	DET_TITULACION
*/
CREATE TABLE det_titulacion (
    cod_personal         INT NOT NULL PRIMARY KEY,
    cod_instituto        INT NOT NULL PRIMARY KEY,
    cod_logro_academico  INT NOT NULL PRIMARY KEY,
    anio_titulacion      INT NOT NULL,
    promedio             INT,
    cod_estado_registro  INT(1) NOT NULL
);

ALTER TABLE det_titulacion
    ADD CONSTRAINT rl_est_reg_det_titulo FOREIGN KEY ( cod_estado_registro )
        REFERENCES cat_estado_registro ( cod_estado_registro );

ALTER TABLE det_titulacion
    ADD CONSTRAINT rl_insti_rela_det FOREIGN KEY ( cod_instituto )
        REFERENCES cat_instituto_titulo ( cod_instituto );

ALTER TABLE det_titulacion
    ADD CONSTRAINT rl_logro_academic FOREIGN KEY ( cod_logro_academico )
        REFERENCES cat_logros_academicos ( cod_logro_academico );

ALTER TABLE det_titulacion
    ADD CONSTRAINT rl_pers_tit FOREIGN KEY ( cod_personal )
        REFERENCES datos_personales ( cod_personal );
										  
								






	

