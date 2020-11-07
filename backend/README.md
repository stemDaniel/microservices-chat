# Microservices-Based Chat - Backend

## Sign up

**FUNCTIONAL REQUIREMENTS**

- [ ] The user should be able sign up in the system with a nickname and password;

**NON-FUNCTIONAL REQUIREMENTS**

- [ ] The password should be encrypted using bcryptjs

**BUSINESS RULES**

- [ ] The user should not be able to sign up with a nickname that already exists;

## Sign in

**FUNCTIONAL REQUIREMENTS**

- [ ] The user should be able to sign in on the system with his nickname and password;

**NON-FUNCTIONAL REQUIREMENTS**

- [ ] After sign in, a JWT token should be generated;

**BUSINESS RULES**

- [ ] The user should not be able to sign in with a incorrect set of nickname and password;

## Create new rooms

**FUNCTIONAL REQUIREMENTS**

- [ ] The user should be able to create a new room with a name;
- [ ] The user who creates the room should be its moderator;

**BUSINESS RULES**

- [ ] The user should be authenticated with a JWT token to create a new room;


## Enjoy into a room

**FUNCTIONAL REQUIREMENTS**

- [ ] The user should be able to enjoy into one or more rooms;

## Leave a room

**FUNCTIONAL REQUIREMENTS**

- [ ] The user should be able to leave a room;

## Remove an user out a room

**FUNCTIONAL REQUIREMENTS**

- [ ] The room moderator should de able to remove any other users from it;
