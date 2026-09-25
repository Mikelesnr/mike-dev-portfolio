import React from "react";
import { useForm } from "@inertiajs/react";

export default function CustomersTable({
    customers,
    startEditCustomer,
    panelStyles,
}) {
    const deleteForm = useForm();

    const handleDeleteCustomer = (id, name) => {
        if (confirm(`Delete "${name}" from your customers list?`)) {
            deleteForm.delete(route("breeze.customers.destroy", id));
        }
    };

    return (
        <div>
            <h3 className="dash-table-heading">
                Existing Customers ({customers.length})
            </h3>
            <div className="dash-table-wrap">
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Linked Project</th>
                            <th>Logo</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="dash-td-name">
                                    {customer.name}
                                </td>
                                <td className="dash-td-mono">
                                    {customer.projects
                                        ?.map((p) => p.name)
                                        .join(", ") || "—"}
                                </td>
                                <td className="dash-td-mono">
                                    {customer.logo_url ? "Yes" : "—"}
                                </td>
                                <td>
                                    <div className="dash-actions">
                                        <button
                                            type="button"
                                            style={panelStyles.editInlineBtn}
                                            onClick={() =>
                                                startEditCustomer(customer)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="dash-btn-delete"
                                            disabled={deleteForm.processing}
                                            onClick={() =>
                                                handleDeleteCustomer(
                                                    customer.id,
                                                    customer.name
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {customers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="dash-empty">
                                    No customers yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}