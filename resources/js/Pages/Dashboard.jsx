import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm } from "@inertiajs/react";

import AdminNotice from "@/Components/Dashboard/AdminNotice";
import Sidebar from "@/Components/Dashboard/Sidebar";
import ProjectsTab from "@/Components/Dashboard/ProjectsTab";
import SkillsTab from "@/Components/Dashboard/SkillsTab";
import SettingsTab from "@/Components/Dashboard/SettingsTab";
import CustomersTab from "@/Components/Dashboard/CustomersTab";

export default function Dashboard({ categories = [], projects = [], customers = [] }) {
    const { auth } = usePage().props;
    const isAdmin = auth?.user?.is_admin == 1 || auth?.user?.is_admin === true;

    const [activeTab, setActiveTab] = useState("projects");
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [editingCustomerId, setEditingCustomerId] = useState(null);

    const projectForm = useForm({
        name: "",
        url: "",
        description: "",
        techstack: "",
        deployment: "",
        is_featured: false,
        is_hobby: false,
        skill_ids: [],
    });
    const customerForm = useForm({
        name: "",
        logo_url: "",
        project_id: "",
    });
    const categoryForm = useForm({ name: "" });
    const videoForm = useForm({ video_url: "" });

    // ---------- Project actions ---------------------------------------
    const startEditProject = (project) => {
        setEditingProjectId(project.id);
        projectForm.setData({
            name: project.name || "",
            url: project.url || "",
            description: project.description || "",
            techstack: project.techstack || "",
            deployment: project.deployment || "",
            is_featured: Boolean(project.is_featured),
            is_hobby: Boolean(project.is_hobby),
            skill_ids: (project.skills ?? []).map((s) => s.id),
        });
    };

    const cancelEditProject = () => {
        setEditingProjectId(null);
        projectForm.reset();
    };

    const handleProjectSubmit = (e) => {
        e.preventDefault();
        if (editingProjectId) {
            projectForm.put(route("admin.projects.update", editingProjectId), {
                onSuccess: () => {
                    cancelEditProject();
                    alert("Project successfully updated!");
                },
            });
        } else {
            projectForm.post(route("breeze.projects.store"), {
                onSuccess: () => projectForm.reset(),
            });
        }
    };

    // ---------- Category actions --------------------------------------
    const handleCategorySubmit = (e) => {
        e.preventDefault();
        categoryForm.post(route("breeze.categories.store"), {
            onSuccess: () => categoryForm.reset(),
        });
    };

    const handleCategoryDelete = (id, name) => {
        if (
            confirm(
                `Delete "${name}"? This also deletes every skill in this category.`
            )
        ) {
            categoryForm.delete(route("admin.categories.destroy", id));
        }
    };

    // ---------- Customer actions --------------------------------------
    const startEditCustomer = (customer) => {
        setEditingCustomerId(customer.id);
        customerForm.setData({
            name: customer.name || "",
            logo_url: customer.logo_url || "",
            project_id: customer.projects?.[0]?.id ?? "",
        });
    };

    const cancelEditCustomer = () => {
        setEditingCustomerId(null);
        customerForm.reset();
    };

    const handleCustomerSubmit = (e) => {
        e.preventDefault();
        if (editingCustomerId) {
            customerForm.put(
                route("breeze.customers.update", editingCustomerId),
                {
                    onSuccess: () => {
                        cancelEditCustomer();
                        alert("Customer successfully updated!");
                    },
                }
            );
        } else {
            customerForm.post(route("breeze.customers.store"), {
                onSuccess: () => customerForm.reset(),
            });
        }
    };

    // ---------- Settings ----------------------------------------------
    const handleUpdateVideo = (e) => {
        e.preventDefault();
        videoForm.put(route("breeze.settings.video.update"), {
            onSuccess: () => alert("Video configuration updated!"),
        });
    };

    // ---------- Shared panel styles (theme-aware) ---------------------
    // Kept as the exact same shape so downstream components work unchanged.
    // Colors now come from CSS variables.
    const panelStyles = {
        wrapper: {
            backgroundColor: "var(--bg-raised)",
            color: "var(--ink)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--hairline)",
        },
        inputField: {
            width: "100%",
            padding: "10px 12px",
            backgroundColor: "var(--bg)",
            color: "var(--ink)",
            border: "1px solid var(--hairline-strong)",
            borderRadius: "var(--radius-sm)",
            marginTop: "5px",
            fontFamily: "inherit",
            fontSize: "0.9rem",
        },
        primaryBtn: {
            backgroundColor: "var(--brass)",
            color: "#FFFFFF",
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            border: "none",
        },
        secondaryBtn: {
            backgroundColor: "transparent",
            color: "var(--ink-muted)",
            fontWeight: 600,
            padding: "10px 20px",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            border: "1px solid var(--hairline-strong)",
            marginLeft: "10px",
        },
        editInlineBtn: {
            backgroundColor: "var(--bg-soft)",
            color: "var(--ink)",
            padding: "5px 12px",
            borderRadius: "var(--radius-sm)",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            border: "1px solid var(--hairline-strong)",
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="auth-header-title">
                    Portfolio Engineering Panel
                </h2>
            }
        >
            <Head title="Control Deck" />

            <div className="dashboard-page">
                <div className="dashboard-container">
                    {!isAdmin ? (
                        <AdminNotice userName={auth?.user?.name} />
                    ) : (
                        <div className="dashboard-layout">
                            <Sidebar
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            <div
                                className="dashboard-panel"
                                style={panelStyles.wrapper}
                            >
                                {activeTab === "projects" && (
                                    <ProjectsTab
                                        projects={projects}
                                        categories={categories}
                                        projectForm={projectForm}
                                        editingProjectId={editingProjectId}
                                        startEditProject={startEditProject}
                                        cancelEditProject={cancelEditProject}
                                        handleProjectSubmit={handleProjectSubmit}
                                        panelStyles={panelStyles}
                                    />
                                )}
                                {activeTab === "skills" && (
                                    <SkillsTab
                                        categories={categories}
                                        isAdmin={isAdmin}
                                        categoryForm={categoryForm}
                                        handleCategorySubmit={handleCategorySubmit}
                                        handleCategoryDelete={handleCategoryDelete}
                                    />
                                )}
                                {activeTab === "customers" && (
                                    <CustomersTab
                                        customers={customers}
                                        projects={projects}
                                        customerForm={customerForm}
                                        editingCustomerId={editingCustomerId}
                                        startEditCustomer={startEditCustomer}
                                        cancelEditCustomer={cancelEditCustomer}
                                        handleCustomerSubmit={handleCustomerSubmit}
                                        panelStyles={panelStyles}
                                    />
                                )}
                                {activeTab === "settings" && (
                                    <SettingsTab
                                        videoForm={videoForm}
                                        handleUpdateVideo={handleUpdateVideo}
                                        panelStyles={panelStyles}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}