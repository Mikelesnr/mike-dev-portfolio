import React from "react";

export default function CustomerForm({
    customerForm,
    projects,
    editingCustomerId,
    cancelEditCustomer,
    handleCustomerSubmit,
    panelStyles,
}) {
    return (
        <form
            onSubmit={handleCustomerSubmit}
            className="space-y-4 mb-8 bg-black/20 p-6 rounded-xl border border-gray-800"
        >
            <h3
                className="text-md font-bold text-white mb-2"
                style={{ color: editingCustomerId ? "#d9ee60" : "white" }}
            >
                {editingCustomerId
                    ? `Edit Customer (ID: ${editingCustomerId})`
                    : "Add New Customer"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs font-bold uppercase">
                        Business or Owner Name
                    </label>
                    <input
                        type="text"
                        style={panelStyles.inputField}
                        required
                        value={customerForm.data.name}
                        onChange={(e) =>
                            customerForm.setData("name", e.target.value)
                        }
                    />
                </div>
                <div>
                    <label className="text-xs font-bold uppercase">
                        Logo URL (optional)
                    </label>
                    <input
                        type="url"
                        placeholder="https://..."
                        style={panelStyles.inputField}
                        value={customerForm.data.logo_url}
                        onChange={(e) =>
                            customerForm.setData("logo_url", e.target.value)
                        }
                    />
                </div>
            </div>

            <div>
                <label className="text-xs font-bold uppercase">
                    Linked Project
                </label>
                <select
                    style={panelStyles.inputField}
                    required
                    value={customerForm.data.project_id}
                    onChange={(e) =>
                        customerForm.setData("project_id", e.target.value)
                    }
                >
                    <option value="">Select an existing project</option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center">
                <button
                    type="submit"
                    style={panelStyles.primaryBtn}
                    disabled={customerForm.processing}
                >
                    {customerForm.processing
                        ? "Saving..."
                        : editingCustomerId
                          ? "Update Customer"
                          : "Save Customer"}
                </button>
                {editingCustomerId && (
                    <button
                        type="button"
                        style={panelStyles.secondaryBtn}
                        onClick={cancelEditCustomer}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
