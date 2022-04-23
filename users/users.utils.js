import jsonwebtoken from "jsonwebtoken";
import client from "../client";
export const getUser = async(authorization) => {
    try {
        if(!authorization) {
            return null;
        }
        const {id} = jsonwebtoken.verify(authorization, process.env.SECRET_KEY);
        const user = await client.user.findUnique({where: {id}});
        if(user) {
            return user;
        } else {
            return null;
        }
    } catch(error) {
        console.log(error);
        return null;
    }
    
}


export const protectedResolver = (ourResolver) => (root, args, context, info) => {
    if(!context.loggedInUser) {
        return {
            ok: false,
            error: "Please log in to perform this action."
        }
    }
    return ourResolver(root, args, context, info);
}

// export function protectedResolver(ourResolver) {
//     return function(root, args, context, info) {
//         if(!context.loggedInUser) {
//             return {
//                 ok: false,
//                 error: "Please log in to perform this action."
//             }
//         }
//         return ourResolver(root, args, context, info);
//     }
// }