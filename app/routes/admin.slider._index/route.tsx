import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import AdminLayout from "../../layouts/AdminLayout";
import loadAllSlider from "./loader.server";
import ActionSlider from "./action.server";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { ActionRespone } from "~/utils/responseTypes";


/* import { loaderAuth } from "~/services/auth.server";
export const loader = loaderAuth; */



export const loader = loadAllSlider
export const action = ActionSlider

export default function AdminCategory() {

    const listCategory = useLoaderData<typeof loader>();
    const fetcher = useFetcher<ActionRespone>();

    // console.log("check category", listCategory);

    const handleDelete = (id: number) => {
        const formData = new FormData();
        formData.append("action", "delete");
        formData.append("id", String(id));

        fetcher.submit(formData, { method: "POST" });
    }

    useEffect(() => {
        if (fetcher.data) {
            if (fetcher.data?.success) {
                toast.success(fetcher.data.message)
            }
        }
    }, [fetcher.data])


    return (
        <>
            <AdminLayout>
                <div className="d-flex justify-between p-4">

                    <h4>Slider Management</h4>

                    <a href="slider/add" className="btn btn-success">Add slider</a>

                </div>
                <div className="col-12">
                    <div className="bg-light rounded h-100 p-4">
                        <h6 className="mb-4">Responsive Table</h6>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Tag</th>
                                        <th scope="col">ImgUrl</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listCategory && listCategory.length > 0 && listCategory.map((item: any) => {
                                        return (
                                            <tr>
                                                <td scope="row">{item.id}</td>
                                                <td>{item.name}</td>
                                                {/* <td className="text-truncate text-nowrap limited-text" style={{ maxWidth: '200px' }}>
                                                    {item.description}
                                                </td> */}
                                                <td className="overflow-auto" style={{ maxHeight: "100px", maxWidth: '250px',  display: "block" }}>
                                                    {item.description}
                                                </td>
                                                <td>{item.tag}</td>
                                                <td>{item.imageUrl}</td>
                                                <td>
                                                    <a href={`slider/edit/${item.id}`} className="btn btn-warning ">Edit</a>

                                                    <span onClick={() => { handleDelete(item.id) }} className="btn btn-danger mx-3">Delete</span>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}