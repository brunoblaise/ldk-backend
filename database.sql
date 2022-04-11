--CREATE DATABASE school;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE notes(
  notes_id uuid DEFAULT uuid_generate_v4(),
  class_year_content VARCHAR(100) NOT NULL,
  teacher_email VARCHAR(100) NOT NULL,
  notes_title VARCHAR(100) NOT NULL UNIQUE,
  short_note VARCHAR(300) NOT NULL,
  timestamp timestamp default current_timestamp,
  notes_url  VARCHAR(100) NOT NULL,
  PRIMARY KEY(notes_id)

);

CREATE TABLE work(
  work_id uuid DEFAULT uuid_generate_v4(),
  class_year_content VARCHAR(100) NOT NULL,
  work_title VARCHAR(100) NOT NULL UNIQUE,
  work_note VARCHAR(300) NOT NULL,
  timestamp timestamp default current_timestamp,
  work_url  VARCHAR(100) NOT NULL,
  teacher_email VARCHAR(255) NOT NULL,
  PRIMARY KEY(work_id)

);


CREATE TABLE student(
  student_id uuid DEFAULT uuid_generate_v4(),
  class_student VARCHAR(100) NOT NULL,
  student_type VARCHAR(255) NOT NULL,
  student_fname VARCHAR(255) NOT NULL,
  hide varchar(20) NOT NULL,
  student_lname VARCHAR(255) NOT NULL,
  parent VARCHAR(255) NOT NULL,
  student_gender VARCHAR(255) NOT NULL,
  student_email VARCHAR(255) NOT NULL UNIQUE,
  student_password VARCHAR(255) NOT NULL,
  student_photo VARCHAR(255) NOT NULL,
  student_age VARCHAR(255) NOT NULL,
  student_phonem VARCHAR(255) NOT NULL,
  student_bio VARCHAR(255) NOT NULL,
  timestamp timestamp default current_timestamp,

  PRIMARY KEY(student_id)

);


CREATE TABLE parent(
  parent_id uuid DEFAULT uuid_generate_v4(),
  parent_fname VARCHAR(255) NOT NULL UNIQUE,
  hide varchar(20) NOT NULL,
  parent_lname VARCHAR(255) NOT NULL,
  parent_gender VARCHAR(255) NOT NULL,
  parent_email VARCHAR(255) NOT NULL UNIQUE,
  parent_password VARCHAR(255) NOT NULL,
  parent_photo VARCHAR(255) NOT NULL,
  parent_phonem VARCHAR(255) NOT NULL,
  parent_bio VARCHAR(255) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY KEY(parent_id)
);


CREATE TABLE IF NOT EXISTS  "messages"(
    "id" SERIAL PRIMARY KEY,
    "content" text,
    "email" VARCHAR(255) NOT NULL,
    "level" VARCHAR(255) NOT NULL,
    "send_time" timestamp NOT NULL DEFAULT NOW()
    
);







CREATE TABLE report(
  report_id uuid DEFAULT uuid_generate_v4(),
  student_email VARCHAR(255) NOT NULL,
  report_url VARCHAR(100) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY KEY(report_id)
);



CREATE TABLE teacher(
  teacher_id uuid DEFAULT uuid_generate_v4(),
  teacher_fname VARCHAR(255) NOT NULL,
  teacher_lname VARCHAR(255) NOT NULL,
  teacher_type VARCHAR(255) NOT NULL,
  teacher_gender VARCHAR(255) NOT NULL,
  teacher_email VARCHAR(255) NOT NULL UNIQUE,
  teacher_password VARCHAR(255) NOT NULL,
  teacher_photo VARCHAR(255) NOT NULL,
  teacher_age VARCHAR(255) NOT NULL,
  teacher_phonem VARCHAR(255) NOT NULL,
  teacher_bio VARCHAR(255) NOT NULL,
  timestamp timestamp default current_timestamp,

  PRIMARY KEY(teacher_id)

);



CREATE TABLE challenge(
  challenge_id uuid DEFAULT uuid_generate_v4(),
  challenge_name VARCHAR(255) NOT NULL,
  challenge_question VARCHAR(255) NOT NULL,
   challenge_choice varchar[4] NOT NULL,
  challenge_answer  VARCHAR(255) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY KEY(challenge_id)
);



CREATE TABLE syllabus(
  syllabus_id uuid DEFAULT uuid_generate_v4(),
  titled_syl VARCHAR(255) NOT NULL,
  url_syllabus  VARCHAR(255) NOT NULL,
  class_year_content VARCHAR(255) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY KEY(syllabus_id)
);



 CREATE TABLE IF NOT EXISTS "courses"(
     "id" uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
     "course_name" VARCHAR(200) NOT NULL,
     "course_level" VARCHAR(200) NOT NULL,
     "course_category" VARCHAR(200) NOT NULL,
     "course_duration" VARCHAR(200) NOT NULL,
     "course_type" VARCHAR(200) NOT NULL,
     "teacher_email" VARCHAR(255) NOT NULL,
     "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
     PRIMARY KEY("course_name"),
     unique("course_name")

 );


 CREATE TABLE IF NOT EXISTS "quiz"(
  "id" SERIAL,
  "quiz_question" VARCHAR(255) NOT NULL,
  "quiz_choice" varchar[4] NOT NULL,
  "quiz_answer"  VARCHAR(255) NOT NULL,
  "course_name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "teacher_email" VARCHAR(255) NOT NULL,
  FOREIGN KEY(course_name) REFERENCES courses(course_name) ON DELETE CASCADE
 
);

CREATE TABLE IF NOT EXISTS "open"(
   "id" SERIAL,
  "content" TEXT NOT NULL,
  "course_name" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "teacher_email" VARCHAR(255) NOT NULL,
  FOREIGN KEY(course_name) REFERENCES courses(course_name) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS "answers"(
   "id" SERIAL,
  "course_name" VARCHAR(255) NOT NULL,
  "content" TEXT NOT NULL,
  "level" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "teacher_email" VARCHAR(255) NOT NULL,
  "student_email" VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS "marks"(
    "id"SERIAL,
    "marks" VARCHAR(20) NOT NULL,
    "course_name" VARCHAR(255) NOT NULL,
    "feedback" VARCHAR(255) NOT NULL,
    "student_email" VARCHAR(255) NOT NULL,
    "teacher_email" VARCHAR(255) NOT NULL
    );


CREATE TABLE IF NOT EXISTS "logs"(
    "id"SERIAL,
    "rfid" VARCHAR(400) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
   
    );
