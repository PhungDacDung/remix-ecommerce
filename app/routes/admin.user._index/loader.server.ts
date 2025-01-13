import prisma from "~/client"



export default async function loadAllUser(){
    const users = await prisma.user.findMany({});

    if(!users){
        throw new Error("No have any user!");
        
    }

    return users;
}