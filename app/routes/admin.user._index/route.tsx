import { useLoaderData } from "@remix-run/react";
import AdminLayout from "../../layouts/AdminLayout";
import loadAllUser from "./loader.server";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { requireUserId } from "~/services/session.server";

export async function loaderAuth({ request}: LoaderFunctionArgs) {
    await requireUserId(request);
  
    return json({});
}


export const loader = loadAllUser;

export default function AdminUser() {

    const listUser = useLoaderData<typeof loader>();

    console.log("check user route", listUser);
    // console.log("check  route user");
    
    

    const handleDelete = (id:number)=>{

    }

    return (
        <>
            <AdminLayout>
                <h3>Users Management</h3>
                <div className="col-12">
                    <div className="bg-light rounded h-100 p-4">
                        <h6 className="mb-4">Responsive Table</h6>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">ZIP</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUser && listUser.length > 0 && listUser.map((item: any) => {
                                        return (
                                            <tr>
                                                <td scope="row">{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>USA</td>
                                                <td>123</td>
                                                <td>
                                                    <a href={`user/edit/${item.id}`} className="btn btn-warning ">Edit</a>

                                                    <a onClick={() => { handleDelete(item.id) }} className="btn btn-danger mx-3">Delete</a>
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