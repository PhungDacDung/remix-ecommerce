import { ActionFunctionArgs, json } from "@remix-run/node";
import prisma from "~/client";
import path from "path";
import fs from "fs";

export default async function ActionProduct({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const actionType = formData.get("action")

  switch (actionType) {
    case "add": {
      try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = formData.get("price") as string;
        const quantity = formData.get("quantity") as string;
        const categoryId = formData.get("categoryId") as string;



        // Kiểm tra dữ liệu đầu vào
        if (!name || name.trim() === "") {
          return json(
            { success: false, message: "Product name is required" },
            { status: 400 }
          );
        }

        const product = await prisma.product.create({
          data: {
            name: name,
            description: description,
            price: parseFloat(price),
            quantity: parseInt(quantity,10),
            categoryId: parseInt(categoryId,10),
          },
        });

        // Xử lý ảnh
        const imgFiles = formData.getAll("imgFile") as File[];

        const imageUrls = [];

        // Lưu ảnh vào thư mục 'public/images'
        for (let file of imgFiles) {
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = path.join("public/uploads", fileName);

          // Đọc file và lưu vào thư mục
          const buffer = await file.arrayBuffer();
          fs.writeFileSync(filePath, Buffer.from(buffer));

          imageUrls.push(`/uploads/${fileName}`);
        }

        // Lưu các ảnh vào bảng product_images
        for (let imageUrl of imageUrls) {
          await prisma.product_image.create({
            data: {
              productId: product.id,
              path : imageUrl,
            },
          });
        }

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
  }

  return null;
}