import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Utilisez useNavigate au lieu de useHistory
import "./Login.css";

const Login = () => {
  const navigate = useNavigate(); // Changez la déclaration de useHistory à useNavigate
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data['email'],
          password: data['password'],
        }),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        if (responseData.redirect_url) {
          navigate(responseData.redirect_url); // Utilisez navigate au lieu de history.push
        } else {
          navigate('//');
        }
      }

    } catch (error) {
      console.error('Erreur lors de la requête au backend :', error);
    }
  };

  return (
    <section>
      <div className="register">
        <div className="col-2">
          <img src="/images/sign.jpeg" alt="Sign In" />
        </div>
        <div className="col-1">
          <h2>Sign In</h2>
          <span>Register and enjoy the service</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email address"
            />
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />

            <button type="submit" className="btn">Done</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;