

export type UserName = string;
export type PassWord = string;
export type Email = string;
export type Name = string;

enum CollectionName {
    user="User",
}

export function createUser(
    ctx: any,
    args: {
        username: UserName,
        password: PassWord,
        name: Name,
        email: Email,
        isActive?: boolean,
        isAdmin?: boolean,
    })
{
    ctx.db.collection(CollectionName.user).insertOne({
        username: args.username,
        password: args.password,
        name: args.name,
        email: args.email,
        isActive: true,
        isAdmin: false,
    });
}

export function updateUser(){

}

export function readUser(){

}

export function readUsers(){

}

export function deleteUser(){

}