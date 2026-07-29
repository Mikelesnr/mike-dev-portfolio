import React from "react";
import CustomerForm from "./CustomerForm";
import CustomersTable from "./CustomersTable";

export default function CustomersTab({
    customers,
    projects,
    customerForm,
    editingCustomerId,
    startEditCustomer,
    cancelEditCustomer,
    handleCustomerSubmit,
    panelStyles,
}) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Customers</h2>
            <p className="text-sm text-gray-400 mb-6">
                Businesses and owners you've built for, each linked to an
                existing project. Shown on the homepage after Why Choose Me.
            </p>

            <CustomerForm
                customerForm={customerForm}
                projects={projects}
                editingCustomerId={editingCustomerId}
                cancelEditCustomer={cancelEditCustomer}
                handleCustomerSubmit={handleCustomerSubmit}
                panelStyles={panelStyles}
            />

            <CustomersTable
                customers={customers}
                startEditCustomer={startEditCustomer}
                panelStyles={panelStyles}
            />
        </div>
    );
}
