create table proposal
(
    id             bigint auto_increment
        primary key,
    end_datetime   datetime(6) not null,
    start_datetime datetime(6) not null
);

