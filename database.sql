CREATE DATABASE school;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



CREATE TABLE name (
   name_id uuid DEFAULT uuid_generate_v4(),
   timestamp timestamp default current_timestamp,
   name  VARCHAR(100) NOT NULL,
  PRIMARY KEY(name_id)
);

CREATE TABLE notes(
  class_year_content VARCHAR(100) NOT NULL,
  notes_id uuid DEFAULT uuid_generate_v4(),
  notes_title VARCHAR(100) NOT NULL,
  notes_url VARCHAR(100) NOT NULL,
  short_notes VARCHAR(100) NOT NULL,
  teacher_email VARCHAR(100) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY KEY(notes_id)
);

CREATE TABLE work(
  class_year_content VARCHAR(100) NOT NULL,
  work_id uuid DEFAULT uuid_generate_v4(),
  work_title VARCHAR(100) NOT NULL,
  work_url VARCHAR(100) NOT NULL,
  work_note VARCHAR(100) NOT NULL,
  teacher_email VARCHAR(100) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY KEY(work_id)
);

CREATE TABLE student(
  student_id uuid DEFAULT uuid_generate_v4(),
  class_student VARCHAR(100) NOT NULL,
  hide VARCHAR(100) NOT NULL,
  student_fname VARCHAR(255) NOT NULL,
  student_lname VARCHAR(255) NOT NULL,
  student_gender VARCHAR(255) NOT NULL,
  student_email VARCHAR(255) NOT NULL UNIQUE,
  student_password VARCHAR(255) NOT NULL,
  student_photo VARCHAR(255) NOT NULL,
  student_age VARCHAR(255) NOT NULL,
  student_phonem VARCHAR(255) NOT NULL,
  student_bio VARCHAR(255) NOT NULL,
  student_type VARCHAR(255) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY KEY(student_id)
);

CREATE TABLE messages(
  content TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  id uuid DEFAULT uuid_generate_v4(),
  level VARCHAR(255) NOT NULL,
  send_time timestamp default current_timestamp,
  PRIMARY KEY(id)
);

CREATE TABLE report(
  report_id uuid DEFAULT uuid_generate_v4(),
  report_url VARCHAR(255) NOT NULL,
  student_email VARCHAR(255) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY key(report_id)
);

CREATE TABLE teacher(
  teacher_id uuid DEFAULT uuid_generate_v4(),
  
  teacher_fname VARCHAR(255) NOT NULL,
  teacher_lname VARCHAR(255) NOT NULL,
  teacher_gender VARCHAR(255) NOT NULL,
  teacher_email VARCHAR(255) NOT NULL UNIQUE,
  teacher_password VARCHAR(255) NOT NULL,
  teacher_photo VARCHAR(255) NOT NULL,
  teacher_age VARCHAR(255) NOT NULL,
  teacher_phonem VARCHAR(255) NOT NULL,
  teacher_bio VARCHAR(255) NOT NULL,
  teacher_type VARCHAR(255) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY KEY(teacher_id)
);

CREATE TABLE challenge(
  challenge_answer VARCHAR(255) NOT NULL,
  challenge_choice VARCHAR[4] NOT NULL,
  challenge_id uuid DEFAULT uuid_generate_v4(),
  challenge_name VARCHAR(100) NOT NULL,
  challenge_question VARCHAR(255) NOT NULL,
  timestamp timestamp default current_timestamp,
  PRIMARY KEY(challenge_id)
);

CREATE TABLE syllabus(
  class_year_content VARCHAR(255) NOT NULL,
  syllabus_id uuid DEFAULT uuid_generate_v4(),
  timestamp timestamp default current_timestamp,
  titled_syl VARCHAR(100) NOT NULL,
  url_syllabus VARCHAR(255) NOT NULL,
  PRIMARY KEY(syllabus_id)
);

CREATE TABLE courses(
  course_category VARCHAR(255) NOT NULL,
  course_course VARCHAR(100) NOT NULL,
  course_duration VARCHAR(255) NOT NULL,
  course_level VARCHAR(255) NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  course_type VARCHAR(100) NOT NULL,
  created_at timestamp default current_timestamp,
  id uuid DEFAULT uuid_generate_v4(),
  teacher_email VARCHAR(200) NOT NULL,
  PRIMARY KEY(id)
  
);

CREATE TABLE quiz(
  course_name VARCHAR(255) NOT NULL,
  quiz_answer VARCHAR(255) NOT NULL,
  quiz_choice VARCHAR[4] NOT NULL,
  id uuid DEFAULT uuid_generate_v4(),
  quiz_name VARCHAR(100) NOT NULL,
  quiz_question VARCHAR(255) NOT NULL,
  teacher_email VARCHAR(255) NOT NULL,
  created_at timestamp default current_timestamp,
  PRIMARY KEY(id)
);

CREATE TABLE open(
  content TEXT NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  created_at timestamp default current_timestamp,
  id uuid DEFAULT uuid_generate_v4(),
  teacher_email VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE answers(
  content TEXT NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  id uuid DEFAULT uuid_generate_v4(),
  created_at timestamp default current_timestamp,
  level VARCHAR(100) NOT NULL,
  student_email VARCHAR(100) NOT NULL,
  teacher_email VARCHAR(200) NOT NULL,
);

CREATE TABLE marks(
  course_name VARCHAR(100),
  feedback VARCHAR(255),
  id uuid DEFAULT uuid_generate_v4(),
  marks VARCHAR(255) NOT NULL,
  student_email VARCHAR(100) NOT NULL,
  teacher_email VARCHAR(100) NOT NULL,
  PRIMARY KEY(id)
);