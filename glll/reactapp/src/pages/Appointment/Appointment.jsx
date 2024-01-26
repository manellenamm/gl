import React from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./Appointment.css";
import Header from "../New folder/search section/header/header";

export default function Appointment(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/appointments/:avocat_email/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data["username"],
            avocat_email: data["avocat_email"],
            tel: data["tel"],
            time: data["time"],
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        if (responseData.redirect_url) {
          navigate(responseData.redirect_url); // Utilisez navigate au lieu de history.push
        } else {
          navigate("//");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la requête au backend :", error);
    }
  };
  // console.log(watch('username'));

  return (
    <section>
      <Header />
      <div className="register">
        <div className="col-2">
          <img src="/images/appointment.jpg" />
        </div>
        <div className="col-1">
          <h2>Make an appointment</h2>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("username")}
              placeholder="username"
              name="username"
            />
            <input
              type="Email"
              {...register("Email adress", { required: true })}
              placeholder=" Email adress "
              name="avocat_email"
            />

            <input
              type="tel"
              {...register("mobile", { required: true, maxLength: 10 })}
              placeholder="mobile number"
              name="tel"
            />
            {errors.mobile?.type === "required" && "Mobile Number is required"}
            {errors.mobile?.type === "maxLength" && "Max Length Exceed"}

            <input
              type="time"
              {...register("appointmentTime", {
                required: true,
                maxLength: 10,
              })}
              placeholder="Time"
              name="time"
            />
            {errors.appointmentTime?.type === "required" && "Time is required"}

            {/* Date Field */}

            <div>
              <div>
                <input type="date" className="w-96 text-3xl rounded-lg" />
              </div>
            </div>

            <button className="btn">Sign In</button>
          </form>
        </div>
      </div>
    </section>
  );
}