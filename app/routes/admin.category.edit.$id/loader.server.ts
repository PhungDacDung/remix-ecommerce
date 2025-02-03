import prisma from "~/client"
import { LoaderFunction, redirect } from "@remix-run/node";


export const loadEditCategory:LoaderFunction = async ({request, params}) =>{
   
    try {
        if(params.id) {
            const category = await prisma.category.findFirst({
                where: {id:parseInt(params?.id)}
            })
            
            return category;
        }    

    } catch (error:any) {
        return error.message;
        
    }
   return null;
}