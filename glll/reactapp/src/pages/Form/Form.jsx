import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password_avocat", data.password);
      formData.append("password2", data.confirmpwd);
      formData.append("Numero_de_telephone", data.mobile);
      formData.append("email", data["Email adress"]);
      formData.append("image", data.image[0]);  
      formData.append("specialite", data.speciality);
      formData.append("Adresse", data.adress);
      formData.append("langue", data.langue);

      const response = await fetch("http://127.0.0.1:8000/api/registeravocat/", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
       
      }
    } catch (error) {
      console.error("Erreur lors de la requête au backend :", error);
    }
  };

  return (
    <section>
      <div className="register">
        <div className="col-2">
          <img src="/images/form.jpg" alt="Registration" />
        </div>
        <div className="col-1">
          <h2>Sign In</h2>
          <span>Register and enjoy the service</span>

          <form
            id="form"
            className="flex flex-col"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("username")}
              placeholder="Username"
            />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
            />
            <input
              type="password"
              {...register("confirmpwd")}
              placeholder="Confirm Password"
            />
            <input
              type="tel"
              {...register("mobile", { required: true, maxLength: 10 })}
              placeholder="Mobile Number"
            />
            {errors.mobile?.type === "required" && "Mobile Number is required"}
            {errors.mobile?.type === "maxLength" && "Max Length Exceeded"}
            <input
              type="Email"
              {...register("Email adress", { required: true })}
              placeholder="Email Address"
            />
            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Choose Image
            </label>
            <input type="file" {...register("image")} name="image" accept="image/*" required />
            <input
              type="text"
              {...register("speciality")}
              placeholder="Speciality"
            />
            <input
              type="text"
              {...register("adress", { required: true })}
              placeholder="Address"
            />
            <input
              type="text"
              {...register("langue")}
              placeholder="Langue"
            />
            <button type="submit" className="btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}