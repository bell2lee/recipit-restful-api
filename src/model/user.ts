

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
        isActive?: boolean,
        isAdmin?: boolean,
    })
{
    await ctx.db.collection(CollectionName.user).insertOne({
        username: args.username,
        password: args.password,
        name: args.name,
        email: args.email,
        isActive: true,
        isAdmin: false,
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
    let updateFields:any = {};
    Object.entries(args).forEach((field:any) => {
        updateFields = {
            ...updateFields,
            [field[0]]: field[1],
        };
    });
    return await ctx.db.collection(CollectionName.user).updateOne({_id: new mongo.ObjectId(updateFields.id)}, {
        $set: {
            ...updateFields
        }
    });

}

export async function readUser(
    ctx: any,
    args: {
        id: mongo.ObjectId,
    }
)
{
    return await ctx.db.collection(CollectionName.user).findOne({
        _id: args.id,
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