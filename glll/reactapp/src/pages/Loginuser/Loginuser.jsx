import React from "react";
import { useForm } from "react-hook-form";
import { SocialSignupButton } from "allauth.socialaccount.views";

export default function Loginuser() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <section>
      <div className="register">
        <div className="col-2">
          <img src="/images/sign.jpeg" alt="Sign In" />
        </div>
        <div className="col-1">
          <h2>Login user</h2>
          <span>Register and enjoy the service</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Vos champs de formulaire ici */}
            <input {...register("username")} placeholder="Username" />
            <input {...register("password")} type="password" placeholder="Password" />

            <button type="submit">Login</button>
          </form>

          {/* Bouton d'inscription sociale avec Google */}
          <SocialSignupButton provider="google" />
        </div>
      </div>
    </section>
  );
}