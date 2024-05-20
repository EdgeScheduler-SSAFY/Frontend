create table attendee
(
    id          bigint auto_increment
        primary key,
    is_required bit                                      not null,
    member_id   int                                      not null,
    reason      varchar(255)                             null,
    status      enum ('ACCEPTED', 'DECLINED', 'PENDING') not null,
    proposal_id bigint                                   null,
    schedule_id bigint                                   not null,
    constraint UK_9wylpw18pnfdcn4objp9rmgl7
        unique (proposal_id),
    constraint FKfj4tba7aqktys0yh6jri598iv
        foreign key (proposal_id) references proposal (id),
    constraint FKioovs8noiyieu24xqgupapthf
        foreign key (schedule_id) references schedule (id)
);

