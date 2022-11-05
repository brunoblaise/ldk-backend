
CREATE TABLE name (
   name_id uuid DEFAULT uuid_generate_v4(),name_id uuid
   timestamp timestamp default current_timestamp,
   name  VARCHAR(100) NOT NULL,
  PRIMARY KEY(name_id)
)