import React from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <header className="auth-card-header">
                <h1 className="auth-card-title">Log in</h1>
                <p className="auth-card-sub">
                    Sign in to manage your portfolio content.
                </p>
            </header>

            {status && (
                <div className="auth-status">{status}</div>
            )}

            <form onSubmit={submit} className="auth-form">
                <div className="form-group">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="form-group">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="auth-form-row">
                    <label className="auth-checkbox-label">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span>Remember me</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="auth-link"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="auth-form-actions">
                    <PrimaryButton disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}