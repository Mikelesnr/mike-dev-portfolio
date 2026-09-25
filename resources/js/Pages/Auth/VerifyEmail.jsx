import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <header className="auth-card-header">
                <h1 className="auth-card-title">Verify your email</h1>
                <p className="auth-card-sub">
                    Thanks for signing up! Please verify your email address
                    by clicking the link we just sent you.
                </p>
            </header>

            {status === "verification-link-sent" && (
                <div className="auth-status">
                    A new verification link has been sent to your email.
                </div>
            )}

            <form onSubmit={submit} className="auth-form">
                <div className="auth-form-actions auth-form-actions-split">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="auth-link"
                    >
                        Log Out
                    </Link>
                    <PrimaryButton disabled={processing}>
                        Resend Verification Email
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}