import React from "react";
import { useForm } from "react-hook-form";
import "./Feedback.css";

export default function Feedback() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/create-comment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Comment submitted successfully');
      } else {
        console.error('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <section>
      <div className="register">
        <div className="col-2">
          <img src="/images/sign.jpeg" alt="Sign" />
        </div>
        <div className="col-1">
          <h2>Your feedback</h2>
          <span>Add your comment</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              {...register("username")}
              placeholder="Username"
            />
            <input
              type="text"
              {...register("client_email", { required: true })}
              placeholder="Email address"
            />
            
            <textarea
              {...register("avis", { required: true })}
              placeholder="Your Comment"
            />

            <button type="submit" className="btn">
              Done
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}