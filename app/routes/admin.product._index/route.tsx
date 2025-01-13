import AdminLayout from "../../layouts/AdminLayout";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { requireUserId } from "~/services/session.server";


export async function loader({ request}: LoaderFunctionArgs) {
    await requireUserId(request);
  
    return json({});
}

export default function AdminProduct() {

    return (
        <>
            <AdminLayout>
                <div className="mt-4 d-flex justify-between">

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
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">ZIP</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>John</td>
                                        <td>Doe</td>
                                        <td>jhon@email.com</td>
                                        <td>USA</td>
                                        <td>123</td>
                                        <td>Member</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>mark@email.com</td>
                                        <td>UK</td>
                                        <td>456</td>
                                        <td>Member</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>jacob@email.com</td>
                                        <td>AU</td>
                                        <td>789</td>
                                        <td>Member</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}