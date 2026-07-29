import React from "react";
import CustomerCard from "./CustomerCard";

export default function CustomersSection({ customers = [] }) {
    if (customers.length === 0) return null;

    return (
        <section id="customers" className="section customers-section">
            <div className="container container-wide">
                <h2 className="body-h2">Businesses I've Built For</h2>
                <p className="ledger-stub">
                    <span>real clients, real projects</span>
                </p>

                <div className="content customers-grid">
                    {customers.map((customer) => (
                        <CustomerCard key={customer.id} customer={customer} />
                    ))}
                </div>
            </div>
        </section>
    );
}
