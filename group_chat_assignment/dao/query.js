const USER_EXIST = 'SELECT * FROM HR.CHATUSERS WHERE USER_MOBILE_NUMBER = :1';
const INSERT_USER = 'INSERT INTO HR.CHATUSERS(USER_MOBILE_NUMBER,USER_NAME,USER_PASSWORD,IS_ADMIN) VALUES(:1, :2, :3, :4)';
const GET_ALL_USERS = 'SELECT * FROM HR.CHATUSERS';
const CREATE_GROUP = 'INSERT INTO HR.GROUPS_(GROUP_ID, GROUP_NAME,CREATED_BY) VALUES(GROUP_ID.NEXTVAL, :1,:2)';
const ADD_USER_GROUP = 'INSERT INTO HR.GROUP_MEMBERS(GROUP_ID, GROUP_MEMBER_NAME,GROUP_MEMBER_NUMBER) VALUES(:1,:2,:3)';
const GET_GROUP_ID = 'SELECT GROUP_ID FROM HR.GROUPS_ WHERE GROUP_NAME =:1 AND CREATED_BY = :2';
const GROUP_EXIST = 'SELECT * FROM HR.GROUPS_ WHERE GROUP_ID = :1 AND CREATED_BY = :2';
const DELETE_GROUP_ID = 'DELETE FROM HR.GROUP_MEMBERS WHERE GROUP_ID = :1';
const DELETE_GROUP = 'DELETE FROM HR.GROUPS_ WHERE GROUP_ID = :1';
const SEARCH_GROUP = 'SELECT * FROM HR.GROUPS_ WHERE GROUP_NAME like :1';
const GET_GROUPS = 'SELECT * FROM HR.GROUPS_';
const GET_GROUP_MEMBERS = 'SELECT * FROM GROUP_MEMBERS WHERE GROUP_ID = :1';
const SEND_MESSAGE = 'INSERT INTO HR.MESSAGES(GROUP_ID,MESSAGE,SENDER_NAME,SENDER_NUMBER) VALUES (:1,:2,:3,:4)';
const GET_ALL_MESSAGES = 'SELECT * FROM HR.MESSAGES WHERE GROUP_ID = :1';

module.exports = { USER_EXIST, INSERT_USER, GET_ALL_USERS, CREATE_GROUP, ADD_USER_GROUP, GET_GROUP_ID, GROUP_EXIST, DELETE_GROUP_ID, DELETE_GROUP, SEARCH_GROUP, GET_GROUPS, GET_GROUP_MEMBERS,SEND_MESSAGE, GET_ALL_MESSAGES }