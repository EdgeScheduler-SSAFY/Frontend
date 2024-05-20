create table auth
(
    id              int auto_increment
        primary key,
    is_deleted      tinyint(1) default 0   null,
    last_login_date date                   null,
    name            varchar(255)           null,
    password        varchar(255)           null,
    provider        varchar(255)           null,
    provider_id     varchar(255)           null,
    refresh_token   varchar(255)           null,
    role            enum ('USER', 'ADMIN') null,
    username        varchar(255)           null,
    constraint UK_5re8bghl4sqkib3pcehhi4src
        unique (username)
)
    engine = InnoDB;

