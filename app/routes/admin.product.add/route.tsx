import { Form, useLoaderData,useActionData,useNavigate } from "@remix-run/react";
import AdminLayout from "~/layouts/AdminLayout";
import loadCategory from "../admin.category._index/loader.server";
import ActionProduct from "../admin.product._index/action.server";
import { useEffect } from "react";
import type { ActionRespone } from "~/utils/responseTypes";
import { toast } from "react-toastify";

/* import { loaderAuth } from "~/services/auth";
export const loader = loaderAuth */

export const loader = loadCategory
export const action = ActionProduct

export default function AddProduct() {

    const listCate = useLoaderData<typeof loader>()

    const actionData = useActionData<ActionRespone>()
        const navigate = useNavigate()
    
        useEffect(()=>{
                if (actionData) {
                    if(actionData?.success){
                        toast.success(actionData.message, {
                            onClose: () => navigate("/admin/product"), // Redirect sau khi toast đóng
                          });
                    }
                    else{
                        toast.error(actionData.message)
                    }
                    
                }
                
            },[actionData])


    return (
        <>
            <AdminLayout>
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-8">
                            <div className="bg-light rounded h-100 p-4">
                                <h6 className="mb-4">Add Product</h6>
                                <Form method="post" encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input type="text" name="name" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea name="description" className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Price</label>
                                        <input type="number" name="price" className="form-control" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Quantity</label>
                                        <input type="number" name="quantity" className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Category Name</label>
                                        <select className="form-select" name="categoryId">
                                            {listCate && listCate.length > 0 && listCate.map((item: any) => {
                                                return (
                                                    <option value={item.id}>{item.name}</option>

                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Product Images</label>
                                        <input className="form-control" type="file" name="imgFile" multiple/>
                                    </div>
                                    <input type="text" name="action" hidden value={"add"} />
                                    <button type="submit" className="btn btn-primary">Add new</button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>

            </AdminLayout>

        </>
    )
}