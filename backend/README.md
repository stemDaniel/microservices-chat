# Microservices-Based Chat - Backend

## :heavy_check_mark: Sign up

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able sign up in the system with a nickname and password;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] The password should be encrypted using bcryptjs

**BUSINESS RULES**

- [x] The user should not be able to sign up with a nickname that already exists;

## :heavy_check_mark: Sign in

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to sign in on the system with his nickname and password;

**NON-FUNCTIONAL REQUIREMENTS**

- [x] After sign in, a JWT token should be generated;

**BUSINESS RULES**

- [x] The user should not be able to sign in with a nickname that does not exists;
- [x] The user should not be able to sign in with a incorrect set of nickname and password;

## :heavy_check_mark: Create new rooms

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to create a new room with a name;
- [x] The user who creates the room should be its moderator;

**BUSINESS RULES**

- [x] The user should be authenticated with a JWT token to create a new room;
- [x] It should not possible to create a room without a valid user;

## :heavy_check_mark: Join a room

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to join one or more rooms;

**BUSINESS RULES**

- [x] It should not be possible for a user who does not exists to join the room;
- [x] It should not be possible for a user to join a room that does not exists;

## :heavy_check_mark: Leave a room

**FUNCTIONAL REQUIREMENTS**

- [x] The user should be able to leave a room;

**BUSINESS RULES**

- [x] The user should not be able to leave a room if his does not exists;
- [x] The user should not be able to leave a room if his already left;
- [x] The user should not be able to leave another user from the room;

## Remove a user from a room

**FUNCTIONAL REQUIREMENTS**

- [ ] The room moderator should de able to remove any other users from it;
