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
            <header className="dash-tab-header">
                <h2 className="dash-tab-title">Customers</h2>
                <p className="dash-tab-sub">
                    Businesses and owners you&apos;ve built for, each linked
                    to an existing project. Shown on the homepage after Why
                    Choose Me.
                </p>
            </header>

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