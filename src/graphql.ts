
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface UpdateUserDto {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: Nullable<string>;
}

export interface AuthResult {
    user: User;
    token: string;
}

export interface IMutation {
    login(email: string, password: string): AuthResult | Promise<AuthResult>;
    register(createUserDto: CreateUserDto): AuthResult | Promise<AuthResult>;
    createUser(createUserDto: CreateUserDto): User | Promise<User>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): User | Promise<User>;
    deleteUser(userId: string): User | Promise<User>;
}

export interface IQuery {
    findUserById(id: string): User | Promise<User>;
    listUser(): User[] | Promise<User[]>;
}

type Nullable<T> = T | null;
