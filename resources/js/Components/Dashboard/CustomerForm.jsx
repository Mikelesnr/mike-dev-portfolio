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
        <form onSubmit={handleCustomerSubmit} className="dash-form">
            <h3
                className={`dash-form-title ${editingCustomerId ? "is-editing" : ""
                    }`}
            >
                {editingCustomerId
                    ? `Edit Customer (ID: ${editingCustomerId})`
                    : "Add New Customer"}
            </h3>

            <div className="dash-form-grid-2">
                <div className="dash-field">
                    <label className="dash-label">
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
                <div className="dash-field">
                    <label className="dash-label">
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

            <div className="dash-field">
                <label className="dash-label">Linked Project</label>
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

            <div className="dash-form-actions">
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