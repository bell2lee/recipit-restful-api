

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
            ...(field[0] === 'id') ?
                {'_id': new mongo.ObjectId(field[1])}:
                {[field[0]]: field[1]},
        };
    });
    console.log(updateFields)
    try{
        await ctx.db.collection(CollectionName.user).updateOne({_id: new mongo.ObjectId(updateFields.id)}, {
            $set: {
                ...updateFields
            }
        });
    }catch (e){
        throw(new HttpError(500, "error"));
    }

}

export function readUser(){

}

export function readUsers(){

}

export function deleteUser(){

}