import { useLoaderData } from "@remix-run/react";
import AdminLayout from "../../layouts/AdminLayout";
import loadAllProduct from "./loader.server";

export const loader = loadAllProduct

export default function AdminProduct() {

    const listProduct = useLoaderData<typeof loader>()

    const handleDelete = (id:number)=>{

    }

    return (
        <>
            <AdminLayout>
                <div className="d-flex justify-between p-4">

                    <h4>Product Management</h4>

                    <a href="product/add" className="btn btn-success">Add product</a>

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
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listProduct && listProduct.length > 0 && listProduct.map((item: any) => {
                                        console.log("check price",item.price);
                                        return (
                                            <tr>
                                                <td scope="row">{item.id}</td>
                                                <td>{item.name}</td>
                                                <td className="overflow-auto" style={{ maxHeight: "100px", maxWidth: '250px',  display: "block" }}>
                                                    {item.description}
                                                </td>
                                                <td>{item.price.d}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.Category?.name}</td>
                                                <td>
                                                    <a href={`user/edit/${item.id}`} className="btn btn-warning ">Edit</a>

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