import { Form, useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import AdminLayout from "~/layouts/AdminLayout";
import ActionSlider from "../admin.slider._index/action.server";
import { useEffect, useState } from "react";
import type { ActionRespone } from "~/utils/responseTypes";
import { loadEditSlider } from "./loader";
import { toast } from "react-toastify";

/* import { loaderAuth } from "~/services/auth.server";
export const loader = loaderAuth */

export const loader = loadEditSlider
export const action = ActionSlider

export default function AddCategory() {

    const slider = useLoaderData<typeof loader>();
    const actionData = useActionData<ActionRespone>()
    const navigate = useNavigate()

    const [name, setName] = useState(slider.name);
    const [des, setDes] = useState(slider.description);
    const [tag, setTag] = useState(slider.tag);
    const [file, setFile] = useState(slider.imageUrl);

    useEffect(() => {
        if (actionData) {
            if (actionData?.success) {
                toast.success(actionData.message, {
                    onClose: () => navigate("/admin/slider"), // Redirect sau khi toast đóng
                });
            }
            else {
                toast.error(actionData.message)
            }

        }

    }, [actionData])

    return (
        <>
            <AdminLayout>
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-12 col-xl-8">
                            <div className="bg-light rounded h-100 p-4">
                                <h6 className="mb-4">Basic Form</h6>
                                <Form method="post" encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text" name="name"
                                            className="form-control"
                                            value={name}
                                            onChange={(event) => { setName(event.target.value) }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            value={des}
                                            onChange={(event) => { setDes(event.target.value) }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Tag Name</label>
                                        <input
                                            type="text" name="tag"
                                            className="form-control"
                                            value={tag}
                                            onChange={(event) => { setTag(event.target.value) }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Image</label>
                                        {slider.imageUrl ? (
                                            <div className="mb-2">
                                                <img src={slider.imageUrl} alt="Current Image" style={{ maxWidth: "200px", maxHeight: "150px" }} />
                                            </div>
                                        ) : (
                                            <p>No image available</p>
                                          )}
                                        <input
                                            className="form-control"
                                            type="file" name="img"
                                            accept="image/*"
                                        />
                                    </div>
                                    <input type="text" hidden name="action" value={"edit"} />
                                    <input type="text" hidden name="id" value={slider.id} />
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