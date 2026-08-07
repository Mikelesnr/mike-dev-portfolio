import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, useForm } from "@inertiajs/react";

// Import modular dashboard primitives
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

    // Form Hooks
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

    // Project Actions
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

    // Category Actions
    const handleCategorySubmit = (e) => {
        e.preventDefault();
        categoryForm.post(route("breeze.categories.store"), {
            onSuccess: () => categoryForm.reset(),
        });
    };

    const handleCategoryDelete = (id, name) => {
        if (
            confirm(
                `Delete "${name}"? This also deletes every skill in this category.`,
            )
        ) {
            categoryForm.delete(route("admin.categories.destroy", id));
        }
    };

    // Customer Actions
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
                },
            );
        } else {
            customerForm.post(route("breeze.customers.store"), {
                onSuccess: () => customerForm.reset(),
            });
        }
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

    const handleUpdateVideo = (e) => {
        e.preventDefault();
        videoForm.put(route("breeze.settings.video.update"), {
            onSuccess: () => alert("Video configuration updated!"),
        });
    };

    // Shared Styling Tokens
    const panelStyles = {
        wrapper: {
            backgroundColor: "#0b1b18",
            color: "#c3e6dd",
            borderRadius: "15px",
            border: "1px solid #b6c9b6",
        },
        inputField: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#0b1b18",
            color: "#c3e6dd",
            border: "1px solid #b6c9b6",
            borderRadius: "6px",
            marginTop: "5px",
        },
        primaryBtn: {
            backgroundColor: "#d9ee60",
            color: "#0b1b18",
            fontWeight: "900",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
        },
        secondaryBtn: {
            backgroundColor: "transparent",
            color: "#b6c9b6",
            fontWeight: "700",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            border: "1px solid #b6c9b6",
            marginLeft: "10px",
        },
        editInlineBtn: {
            backgroundColor: "#b6c9b6",
            color: "#0b1b18",
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
        },
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Portfolio Engineering Panel
                </h2>
            }
        >
            <Head title="Control Deck" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {!isAdmin ? (
                        <AdminNotice userName={auth?.user?.name} />
                    ) : (
                        <div className="flex flex-col md:flex-row gap-6">
                            <Sidebar
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />

                            <div
                                className="flex-1 p-8 shadow-xl"
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
                                        handleProjectSubmit={
                                            handleProjectSubmit
                                        }
                                        panelStyles={panelStyles}
                                    />
                                )}
                                {activeTab === "skills" && (
                                    <SkillsTab
                                        categories={categories}
                                        isAdmin={isAdmin}
                                        categoryForm={categoryForm}
                                        handleCategorySubmit={
                                            handleCategorySubmit
                                        }
                                        handleCategoryDelete={
                                            handleCategoryDelete
                                        }
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
                                        handleCustomerSubmit={
                                            handleCustomerSubmit
                                        }
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
