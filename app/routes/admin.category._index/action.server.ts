import { ActionFunctionArgs, json } from "@remix-run/node";
import prisma from "~/client";


export default async function ActionCategory({request}:ActionFunctionArgs){
    const formData = await request.formData();
    const actionType = formData.get("action")

    switch(actionType){
        case "add" :{
            try {
                const categoryName = formData.get("category_name") as string;
        
                // Kiểm tra dữ liệu đầu vào
                if (!categoryName || categoryName.trim() === "") {
                  return json(
                    { success: false, message: "Category name is required" },
                    { status: 400 }
                  );
                }
        
                await prisma.category.create({
                  data: { name: categoryName },
                });
        
                // Trả về phản hồi thành công
                return json(
                  { success: true, message: "Category added successfully" },
                  { status: 200 }
                );
              } catch (error: any) {
                console.error(error);
        
                // Trả về phản hồi lỗi
                return json(
                  { success: false, message: "Failed to add category", error: error.message },
                  { status: 500 }
                );
              }

        
            break;
        }

        case "edit" : {
          try {
            const categoryName = formData.get("category_name") as string;
            const id = formData.get("id_category") as string            
    
            // Kiểm tra dữ liệu đầu vào
            if (!categoryName || categoryName.trim() === "") {
              return json(
                { success: false, message: "Category name is required" },
                { status: 400 }
              );
            }
    
            await prisma.category.update({
              where: {
                   id: parseInt(id) 
              },
              data: {
                  name: categoryName,
              }
          });

    
            // Trả về phản hồi thành công
            return json(
              { success: true, message: "Category updated successfully" },
              { status: 200 }
            );
          } catch (error: any) {
            console.error(error);
    
            // Trả về phản hồi lỗi
            return json(
              { success: false, message: "Failed to update category", error: error.message },
              { status: 500 }
            );
          }
        }

        case "delete" : {
          try {
            
            const id = formData.get("id") as string            
    
    
            await prisma.category.delete({
              where: {
                   id: parseInt(id) 
              }
          });

    
            // Trả về phản hồi thành công
            return json(
              { success: true, message: "Category deleted successfully" },
              { status: 200 }
            );
          } catch (error: any) {
            console.error(error);
    
            // Trả về phản hồi lỗi
            return json(
              { success: false, message: "Failed to deleted category", error: error.message },
              { status: 500 }
            );
          }
        }
    }
    
    return null;
}