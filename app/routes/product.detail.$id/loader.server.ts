/* import { json, LoaderFunction } from "@remix-run/node";
import prisma from "~/client";


export const loadProductDetail:LoaderFunction = async ({request,params})=>{
    if(params.id){
        const product = await prisma.product.findFirst({
            where: {id:parseInt(params?.id)}
        })

        const productImg = await prisma.product_image.findFirst({
            where: {productId:parseInt(params?.id)}
        })
    
    return json({
        product,productImg
    })
    }
    return null;
} */