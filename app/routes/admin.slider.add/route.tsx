import { Form, useActionData, useFetcher, useNavigate } from "@remix-run/react";
import AdminLayout from "~/layouts/AdminLayout";
import ActionSlider from "../admin.slider._index/action.server";
import { useEffect } from "react";
import type { ActionRespone } from "~/utils/responseTypes";
import { toast } from "react-toastify";

/* import { loaderAuth } from "~/services/auth.server";
export const loader = loaderAuth */


export const action = ActionSlider

export default function AddCategory() {

    const actionData = useActionData<ActionRespone>()
    const navigate = useNavigate()

    useEffect(()=>{
            if (actionData) {
                if(actionData?.success){
                    toast.success(actionData.message, {
                        onClose: () => navigate("/admin/slider"), // Redirect sau khi toast đóng
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
                            <h6 className="mb-4">Basic Form</h6>
                            <Form method="post"  encType="multipart/form-data">
                            <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" name="name" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea  name="description" className="form-control"/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Tag Name</label>
                                    <input type="text" name="tag" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                        <label className="form-label">Image</label>
                                        <input className="form-control" type="file" name="img"  accept="image/*" />
                                    </div>
                                <input type="text" hidden name="action" value={"add"}/>
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