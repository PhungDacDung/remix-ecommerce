import { Form } from "@remix-run/react";
import AdminLayout from "~/layouts/AdminLayout";


export default function AddProduct() {

    return (
        <>
        <AdminLayout>
            <div className="container-fluid pt-4 px-4">
                <div className="row g-4">
                    <div className="col-sm-12 col-xl-8">
                        <div className="bg-light rounded h-100 p-4">
                            <h6 className="mb-4">Basic Form</h6>
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="text" name="name_product" className="form-control"/>
                                    
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Sign in</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>

        </>
    )
}