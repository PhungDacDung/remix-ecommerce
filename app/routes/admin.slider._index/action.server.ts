import { ActionFunctionArgs, json } from "@remix-run/node";
import prisma from "~/client";
import fs from "fs/promises";
import path from "path";

type Slider = {
    name: string;
    description: string;
    tag: string;
    imageUrl?: string; // img là tùy chọn (có thể có hoặc không)
  };

export default async function ActionSlider({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const actionType = formData.get("action")

    switch (actionType) {
        case "add": {
            try {
                const name = formData.get("name") as string;
                const description = formData.get("description") as string;
                const tag = formData.get("tag") as string;
                const file = formData.get("img") as File;

                console.log("check img", file);


                // Kiểm tra dữ liệu đầu vào
                if (!name || name.trim() === "") {
                    return json(
                        { success: false, message: "Slider name is required" },
                        { status: 400 }
                    );
                }


                // Lấy đường dẫn thư mục để lưu file
                const uploadDir = path.join(process.cwd(), "public/uploads");
                const filename = `${Date.now()}-${file.name}`;

                // Đảm bảo thư mục tồn tại
                await fs.mkdir(uploadDir, { recursive: true });

                // Lưu file vào thư mục public/uploads
                const filePath = path.join(uploadDir, filename);
                const buffer = Buffer.from(await file.arrayBuffer());
                await fs.writeFile(filePath, buffer);

                // Lưu đường dẫn vào database
                const imageUrl = `/uploads/${filename}`;


                await prisma.slider.create({
                    data: {
                        name: name,
                        description: description,
                        tag: tag,
                        imageUrl: imageUrl
                    },
                });

                // Trả về phản hồi thành công
                return json(
                    { success: true, message: "Slider added successfully" },
                    { status: 200 }
                );
            } catch (error: any) {
                console.error(error);

                // Trả về phản hồi lỗi
                return json(
                    { success: false, message: "Failed to add slider", error: error.message },
                    { status: 500 }
                );
            }


            break;
        }

        case "edit": {
            try {
                const id = formData.get("id") as string
                const name = formData.get("name") as string;
                const description = formData.get("description") as string;
                const tag = formData.get("tag") as string;
                const imgFile = formData.get("img") as File;

                let imgPath = ""; // Đường dẫn ảnh mới
                console.log("check id",id);
                

                // Kiểm tra dữ liệu đầu vào
                if (!name || name.trim() === "") {
                    return json(
                        { success: false, message: "Slider name is required" },
                        { status: 400 }
                    );
                }


                if (imgFile && typeof imgFile !== "string") {
                    // Tạo đường dẫn lưu file mới
                    const uploadDir = path.join(process.cwd(), "public/uploads");
                    const filename = `${Date.now()}-${imgFile.name}`;
                    await fs.mkdir(uploadDir, { recursive: true });
            
                    // Lưu file mới
                    const filePath = path.join(uploadDir, filename);
                    const buffer = Buffer.from(await imgFile.arrayBuffer());
                    await fs.writeFile(filePath, buffer);
            
                    // Lưu đường dẫn ảnh
                    imgPath = `/uploads/${filename}`;
                }
            
                // Cập nhật dữ liệu trong database (giả sử bạn dùng Prisma)
                const dataToUpdate : Slider = {
                    name :name,
                    description : description,
                    tag : tag,
                };
            
                if (imgPath) {
                    dataToUpdate.imageUrl = imgPath; // Chỉ cập nhật ảnh nếu có file mới
                }
            
                await prisma.slider.update({
                    where: { id: parseInt(id) },
                    data: dataToUpdate,
                });

                // Trả về phản hồi thành công
                return json(
                    { success: true, message: "Slider updated successfully" },
                    { status: 200 }
                );
            } catch (error: any) {
                console.error(error);

                // Trả về phản hồi lỗi
                return json(
                    { success: false, message: "Failed to updated slider", error: error.message },
                    { status: 500 }
                );
            }
        }

        case "delete": {
            try {

                const id = formData.get("id") as string


                await prisma.slider.delete({
                    where: {
                        id: parseInt(id)
                    }
                });


                // Trả về phản hồi thành công
                return json(
                    { success: true, message: "Slider deleted successfully" },
                    { status: 200 }
                );
            } catch (error: any) {
                console.error(error);

                // Trả về phản hồi lỗi
                return json(
                    { success: false, message: "Failed to deleted slider", error: error.message },
                    { status: 500 }
                );
            }
        }
    }

    return null;
}