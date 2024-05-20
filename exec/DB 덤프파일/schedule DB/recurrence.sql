create table recurrence
(
    id             bigint auto_increment
        primary key,
    count          int                                 null,
    expired_date   datetime(6)                         null,
    freq           enum ('DAILY', 'WEEKLY', 'MONTHLY') null,
    intv           int                                 null,
    recurrence_day varchar(255)                        null
);

