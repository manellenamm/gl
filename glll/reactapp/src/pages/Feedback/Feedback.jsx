import React from "react";
import { useForm } from "react-hook-form";
import "./Feedback.css"

export default function Feedback() {
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
          <img src="/images/sign.jpeg" />
        </div>
        <div className="col-1">
          <h2>Your feedback</h2>
          <span>add your comment</span>

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
            
            <textarea
              {...register("comment", { required: true })}
              placeholder="Your Comment"
            />

            <button className="btn">Done</button>
          </form>
        </div>
      </div>
    </section>
  );
}
