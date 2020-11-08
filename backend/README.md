# Microservices-Based Chat - Backend

## :heavy_check_mark: Sign up

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to sign up in the chat;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] The password should be encrypted using bcryptjs;

**BUSINESS RULES**

- [x] The user should not be able to sign up with a nickname that is already in use;

## :heavy_check_mark: Sign in

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to sign in on the chat;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] After sign in, a JWT token should be generated;

**BUSINESS RULES**

- [x] Is is not possible to authenticate a user that does not exists;
- [x] Is is not possible to authenticate a user with wrong password;

## :heavy_check_mark: Create new rooms

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to create a new room;

**BUSINESS RULES**

- [x] The user who creates the room should be the moderator;
- [x] It is not possible to create a room with a moderator that does not exist;
- [x] The user must be authenticated to use this function;

## List all rooms

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to list all rooms;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] The rooms list should be cached using redis;
- [ ] The moderator must be authenticated to use this function;

## Join a room

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to join one or more rooms;

**BUSINESS RULES**

- [x] It is not possible to join a room without being logged in;
- [x] It is not possible to join a room that does not exist;
- [ ] The user must be authenticated to use this function;

## Leave a room

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to leave a room;

**BUSINESS RULES**

- [x] It is not possible to join a room without being logged in;
- [x] It is not possible to left a room that does not exist;
- [x] It is not possible to leave a room that you have already left;
- [ ] The user must be authenticated to use this function;

## Kick a user out of the room

**FUNCTIONAL REQUIREMENTS**

- [x] The room moderator should be able to remove another user from the room;

**BUSINESS RULES**

- [x] It is not possible to remove a user if you are not the room moderator;
- [x] It is not possible to remove a user that does not exist;
- [x] It is not possible to remove a user who is not in the room;
- [x] It is not possible to remove a user from a room that does not exist;
- [ ] The moderator must be authenticated to use this function;

## General

- [x] All data received from request must be validated by celebrate before being sent to the controllers;
- [x] Rate limiter must be implemented to avoid brute force attacks
