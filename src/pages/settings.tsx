import { HandleValidation, updateUser } from "@/api";
import BaseButton from "@/components/BaseButton";
import FormValidation from "@/components/FormValidation";
import RequireAuth from "@/components/guards/RequireAuth";
import SuccessMessage from "@/components/SuccessMessage";
import { UserContext } from "@/contexts/user";
import { useContext, useEffect, useState } from "react";

const Settings = () => {
  const userStore = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState<{
    email: string;
    username: string;
    bio: string;
    image: string;
  }>({
    email: "",
    username: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    if (userStore?.user) {
      setForm({
        email: userStore.user.email,
        username: userStore.user.username,
        bio: userStore.user.bio ?? "",
        image: userStore.user.image ?? "",
      });
    }
  }, [userStore?.user]);

  const submit = async (handleValidation: HandleValidation) => {
    const user = await updateUser(form, handleValidation);

    if (user) {
      userStore?.loadUser(user);
      setSuccess(true);
    }
  };

  return (
    <RequireAuth>
      
    </RequireAuth>
  );
};

export default Settings;
