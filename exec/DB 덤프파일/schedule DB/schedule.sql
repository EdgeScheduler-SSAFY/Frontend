create table schedule
(
    id                    bigint auto_increment
        primary key,
    color                 int                                     not null,
    description           varchar(255)                            null,
    end_datetime          datetime(6)                             not null,
    google_calendar_id    varchar(255)                            null,
    is_public             bit                                     not null,
    name                  varchar(255)                            not null,
    organizer_id          int                                     not null,
    start_datetime        datetime(6)                             not null,
    type                  enum ('MEETING', 'WORKING', 'PERSONAL') not null,
    recurrence_id         bigint                                  null,
    is_deleted            bit default b'0'                        not null,
    parent_schedule_id    bigint                                  null,
    parent_end_datetime   datetime(6)                             null,
    parent_start_datetime datetime(6)                             null,
    constraint UK_esq395o8oegito0gxgabqyfa4
        unique (recurrence_id),
    constraint FK94dwoa5s62v2km19x1iygcyls
        foreign key (recurrence_id) references recurrence (id),
    constraint FKbs3d1ox93nauluwi9lji7270i
        foreign key (parent_schedule_id) references schedule (id)
);

