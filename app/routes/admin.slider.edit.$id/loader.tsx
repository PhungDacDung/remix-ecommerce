import prisma from "~/client"
import { LoaderFunction, redirect } from "@remix-run/node";


export const loadEditSlider:LoaderFunction = async ({request, params}) =>{
   
    try {
        if(params.id) {
            const slider = await prisma.slider.findFirst({
                where: {id:parseInt(params?.id)}
            })
           
            return slider;
        }    

    } catch (error:any) {
        return error.message;
        
    }
   return null;
}