import React from "react";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./Appointment.css";

export default function Appointment(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  
  

  // console.log(watch('username'));

  return (
    <section>
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
            />
            <input
              type="Email"
              {...register("Email adress", { required: true })}
              placeholder=" Email adress "
            />
            
          
          
            <input
              type="tel"
              {...register("mobile", { required: true, maxLength: 10 })}
              placeholder="mobile number"
            />
            {errors.mobile?.type === "required" && "Mobile Number is required"}
            {errors.mobile?.type === "maxLength" && "Max Length Exceed"}
            
        
              
              <input
                type="time"
                {...register("appointmentTime", { required: true,maxLength: 10 })}
                placeholder="Time"
              />
              {errors.appointmentTime?.type === "required" && "Time is required"}
            

            {/* Date Field */}
            
             
             <div>
              <div>
                <input
                type='date'
                className="w-96 text-3xl rounded-lg"
                />
              </div>
             </div>
              
                
            
            <button className="btn">Sign In</button>
          </form>
        </div>
      </div>
    </section>
  );
}
