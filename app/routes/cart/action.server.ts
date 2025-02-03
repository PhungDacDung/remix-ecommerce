import { ActionFunctionArgs, json } from "@remix-run/node";
import { getCart, saveCart } from "~/services/session.server";



export default async function ActionCart({ request }: ActionFunctionArgs) {
    const cartData = await request.formData();
    const action = cartData.get("action");


    switch (action) {
        case "add": {

            try {
                /* const id = cartData.get("id");
                const name = cartData.get("name");
                const description = cartData.get("description");
                const price = cartData.get("price");
                const quantity = cartData.get("quantity");
                const categoryId = cartData.get("categoryId");
                const productImg = cartData.get("productImg"); */

                const newItem = {
                    id: cartData.get("id") as string,
                    name: cartData.get("name") as string,
                    description: cartData.get("description") as string,
                    price: parseFloat(cartData.get("price") as string) || 0,
                    quantity: parseInt(cartData.get("quantity") as string, 10) || 1,
                    categoryId: cartData.get("categoryId") as string,
                    productImg: cartData.get("productImg") as string,
                };
                console.log("check cart");
                

                let cart = await getCart(request);

                // Kiểm tra sản phẩm đã tồn tại hay chưa
                const existingItem = cart.find((item:any) => item.id === newItem.id);
                if (existingItem) {
                    
                    existingItem.quantity += newItem.quantity; // Cập nhật số lượng
                } else {
                    cart.push(newItem); // Thêm sản phẩm mới
                }

                const response = await saveCart(request, cart);

                // Trả về phản hồi thành công
                return json(
                    { success: true, message: "Cart added successfully" },
                    { status: 200 , headers: response.headers}
                );

            } catch (error: any) {
                console.error(error);

                // Trả về phản hồi lỗi
                return json(
                    { success: false, message: "Failed to add cart", error: error.message },
                    { status: 500 }
                );
            }


            break;
        }

        default:
            break;
    }




    return name;

}