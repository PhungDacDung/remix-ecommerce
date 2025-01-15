import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import AdminLayout from "~/layouts/AdminLayout";
import ActionCategory from "../admin.category._index/action.server";
import { loadEditCategory } from "./loader.server";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { ActionRespone } from "~/utils/responseTypes";


/* import { loaderAuth } from "~/services/auth.server";
export const loader = loaderAuth */



export const loader = loadEditCategory
export const action = ActionCategory

export default function AddCategory() {

    const category = useLoaderData<typeof loader>()
    const [nameCate,setNameCate] = useState(category.name)
    const actionData = useActionData<ActionRespone>()
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (actionData) {
            if(actionData?.success){
                toast.success(actionData.message, {
                    onClose: () => navigate("/admin/category"), // Redirect sau khi toast đóng
                  });
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
                            <h6 className="mb-4">Basic Form</h6>
                            <Form method="post">
                                <div className="mb-3">
                                    <label className="form-label">Category Name</label>
                                    <input type="text" name="category_name" className="form-control" value={nameCate} onChange={(event)=>{setNameCate(event.target.value)}}/>
                                </div>
                                <input type="text" hidden name="action" value={"edit"}/>
                                <input type="text" hidden name="id_category" value={category.id} />
                                <button type="submit" className="btn btn-primary">Update</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>

        </>
    )
}