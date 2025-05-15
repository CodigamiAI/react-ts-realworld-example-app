import { HandleValidation, register } from "@/api";
import { HandleValidation, register } from "@/api";
import BaseButton from "@/components/BaseButton";
import FormValidation from "@/components/FormValidation";
import RequireNoAuth from "@/components/guards/RequireNoAuth";
import { UserContext } from "@/contexts/user";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Registration (Sign Up) page.
 *
 * The component follows the same structure & styling conventions that are already
 * used in the Login page so that we keep a consistent look & feel while still
 * making the implementation very small (re-using existing atomic UI
 * components such as `BaseButton` and `FormValidation`).
 *
 * The UI roughly maps the HTML/CSS mock the designers provided:
 *   ─ The outer flex column is provided by the generic `.container` utility
 *     class (see `src/main.css`).
 *   ─ Typography hierarchy (headline & subtitle) mirrors the mock.
 *   ─ Inputs leverage the shared `.form-control` Tailwind component – this
 *     already encapsulates the borders, padding & focus styles found in the
 *     mock stylesheet.
 *
 * The page is wrapped in the `RequireNoAuth` guard so that an authenticated
 * user gets redirected away (same behaviour as the Login page).
 */
const Register = () => {
  const userStore = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    username: string;
    email: string;
    password: string;
  }>({ username: "", email: "", password: "" });

  const submit = async (handleValidation: HandleValidation) => {
    const user = await register(form, handleValidation);

    if (user) {
      userStore?.loadUser(user);
      navigate("/");
    }
  };

  return (
    <RequireNoAuth>
      <div className="container flex flex-col mb-8">
        <div className="lg:w-2xl sm:mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl mb-2 dark:text-white">
              Sign Up
            </h1>
            <Link to="/login" className="text-green hover:underline">
              Have an account?
            </Link>
          </div>

          {/* Form */}
          <FormValidation className="flex flex-col gap-4" action={submit}>
            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                required
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                required
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <BaseButton>Sign Up</BaseButton>
            </div>
          </FormValidation>
        </div>
      </div>
    </RequireNoAuth>
  );
};

export default Register;