import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.confirm"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <header className="auth-card-header">
                <h1 className="auth-card-title">Confirm your password</h1>
                <p className="auth-card-sub">
                    This is a secure area. Please confirm your password before
                    continuing.
                </p>
            </header>

            <form onSubmit={submit} className="auth-form">
                <div className="form-group">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="auth-form-actions">
                    <PrimaryButton disabled={processing}>
                        Confirm
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}