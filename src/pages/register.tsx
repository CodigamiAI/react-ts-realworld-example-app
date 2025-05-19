import { HandleValidation, register } from "@/api";
import BaseButton from "@/components/BaseButton";
import FormValidation from "@/components/FormValidation";
import RequireNoAuth from "@/components/guards/RequireNoAuth";
import { UserContext } from "@/contexts/user";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    </RequireNoAuth>
  );
};

export default Register;
