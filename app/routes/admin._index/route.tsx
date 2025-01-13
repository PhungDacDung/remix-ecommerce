
import AdminLayout from "../../layouts/AdminLayout"
import { requireUserId } from "~/services/session.server";
import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request}: LoaderFunctionArgs) {
    await requireUserId(request);
  
    return json({});
}

export default function Admin() {

    return (

        <>
            <AdminLayout>
                <div className="container-fluid pt-4 px-4">
                    <div className="row g-4">
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-line fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Today Sale</p>
                                    <h6 className="mb-0">$1234</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Sale</p>
                                    <h6 className="mb-0">$1234</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-area fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Today Revenue</p>
                                    <h6 className="mb-0">$1234</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xl-3">
                            <div className="bg-light rounded d-flex align-items-center justify-content-between p-4">
                                <i className="fa fa-chart-pie fa-3x text-primary"></i>
                                <div className="ms-3">
                                    <p className="mb-2">Total Revenue</p>
                                    <h6 className="mb-0">$1234</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </AdminLayout>
        </>
    )
}