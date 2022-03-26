const PORT = 5000;

const PostLabel = {
    HOT: 'Hot',
    IMPORTANT: 'Important',
    SPECIAL: 'Special',
};

const PostStatus = {
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED',
};

const respStatus = {
    OK: 200,
    INVALID: 404,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
};

const errorCode = {
    INVALID: 'INVALID',
    FAILED_ACTION: 'FAILED_ACTION',
    UNAUTHORIZED: 'UNAUTHORIZED',
    NOT_FOUND: 'NOT_FOUND',
};

const PostReportedType = {
    SCAM: 'SCAM', // Lừa đảo
    IDENTITY_THEFT: 'IDENTITY_THEFT', // Mạo danh
    UNTRUTHFUL: 'UNTRUTHFUL', // Sai sự thật
    OTHER: 'OTHER', // Khác
};

const UserStatus = {
    ACTIVE: 'ACTIVE',
    BANNED: 'BANNED',
};

const ReportStatus = {
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED',
    WAIT_FOR_CONFIRM: 'WAIT_FOR_CONFIRM'
};

const gender = {
    MALE: 'male',
    FEMALE: 'female',
};

const delayTime = 1000;
// const deactiveReportOrCommentDelayTime = 10 * 1000
const deactiveReportOrCommentDelayTime = 60 * 1000 * 60 * 24 // Cứ mỗi 24 tiếng sẽ đi deactive các bài viết
const summarizeDataDelayTime = 60 * 1000 * 60 * 1; // Cứ mỗi 1 tiếng đi sum data lại
const getTotalPostsInWeekDelayTime = 60 * 1000 * 60 * 24 * 7 // Cứ mỗi 7 ngày sẽ đi sum lại tổng các bài viết

module.exports = {
    PORT,
    PostLabel,
    PostStatus,
    PostReportedType,
    respStatus,
    errorCode,
    UserStatus,
    ReportStatus,
    delayTime,
    summarizeDataDelayTime,
    deactiveReportOrCommentDelayTime,
    getTotalPostsInWeekDelayTime
};
