create table member
(
    id         int           not null
        primary key,
    department varchar(255)  null,
    email      varchar(255)  null,
    profile    int default 1 null,
    region     varchar(255)  null,
    zone_id    varchar(255)  null,
    constraint FKphk9y14jkg00dw7gp80psfv19
        foreign key (id) references auth (id)
)
    engine = InnoDB;

