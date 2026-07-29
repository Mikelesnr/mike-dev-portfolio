import React from "react";
import { useForm } from "@inertiajs/react";

const actionStyles = {
    btnGroup: { display: "flex", gap: "8px", justifyContent: "flex-end" },
    deleteInlineBtn: {
        backgroundColor: "#ef4444",
        color: "#ffffff",
        padding: "4px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
    },
};

export default function CustomersTable({ customers, startEditCustomer, panelStyles }) {
    const deleteForm = useForm();

    const handleDeleteCustomer = (id, name) => {
        if (confirm(`Delete "${name}" from your customers list?`)) {
            deleteForm.delete(route("breeze.customers.destroy", id));
        }
    };

    return (
        <div>
            <h3 className="text-md font-bold mb-3">
                Existing Customers ({customers.length})
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-t border-gray-800">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-800">
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Linked Project</th>
                            <th className="py-3 px-2">Logo</th>
                            <th className="py-3 px-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr
                                key={customer.id}
                                className="border-b border-gray-900 hover:bg-black/10"
                            >
                                <td className="py-3 px-2 font-bold text-white">
                                    {customer.name}
                                </td>
                                <td className="py-3 px-2 text-xs text-gray-400">
                                    {customer.projects
                                        ?.map((p) => p.name)
                                        .join(", ") || "—"}
                                </td>
                                <td className="py-3 px-2 text-xs text-gray-500">
                                    {customer.logo_url ? "Yes" : "—"}
                                </td>
                                <td className="py-3 px-2">
                                    <div style={actionStyles.btnGroup}>
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
                                            style={actionStyles.deleteInlineBtn}
                                            disabled={deleteForm.processing}
                                            onClick={() =>
                                                handleDeleteCustomer(
                                                    customer.id,
                                                    customer.name,
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
                                <td colSpan="4" className="text-center py-6 text-gray-500">
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
