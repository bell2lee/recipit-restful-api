

export type UserName = string;
export type PassWord = string;
export type Email = string;
export type Name = string;

enum CollectionName {
    user="User",
}

export async function createUser(
    ctx: any,
    args: {
        username: UserName,
        password: PassWord,
        name: Name,
        email: Email,
        isActive: boolean,
        isAdmin: boolean,
    })
{
    await ctx.db.collection(CollectionName.user).insertOne({
        username: args.username,
        password: args.password,
        name: args.name,
        email: args.email,
        isActive: args.isActive,
        isAdmin: args.isAdmin,
    });
}

export async function updateUser(
    ctx: any,
    args: {
        id: mongo.ObjectId,
        username?: UserName,
        password?: PassWord,
        name?: Name,
        email?: Email,
        isActive?: boolean,
        isAdmin?: boolean,
    }
){
    return await ctx.db.collection(CollectionName.user).updateOne({_id: args.id}, {
        $set: {
            ...(args.username !== undefined) ? {username: args.username} : {},
            ...(args.password !== undefined) ? {password: args.password} : {},
            ...(args.name !== undefined) ? {name: args.name} : {},
            ...(args.email !== undefined) ? {email: args.email} : {},
            ...(args.isActive !== undefined) ? {isActive: args.isActive} : {},
            ...(args.isAdmin !== undefined) ? {isAdmin: args.isAdmin} : {},
        }
    });

}

export async function readUser(
    ctx: any,
    args: {
        id?: mongo.ObjectId,
        username?: UserName,
        password?: PassWord,
    }
)
{
    return await ctx.db.collection(CollectionName.user).findOne({
        ...(args.id !== undefined) ?  {_id: args.id} : {},
        ...(args.username !== undefined) ? {username: args.username} : {},
        ...(args.password !== undefined) ? {password: args.password} : {},
        isDeleted: {$not: {$eq: true}},
    });
}

export async function readUsers(
    ctx: any,
){
    return await ctx.db.collection(CollectionName.user).find({
        isDeleted: {$not: {$eq: true}},
    }).toArray();
}

export async function deleteUser(
    ctx: any,
    args: {
        id: mongo.ObjectId,
    }
){
    await ctx.db.collection(CollectionName.user).updateOne({_id: args.id}, {
        $set: {
            isDeleted: true,
        }
    })
}