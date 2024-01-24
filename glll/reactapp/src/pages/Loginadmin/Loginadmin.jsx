
import { useForm } from "react-hook-form";
import { GoogleLogin } from "react-google-login";
import "./Loginadmin.css";

export default function Loginadmin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const responseGoogle = (response) => {
    // Handle the Google login response
    console.log(response);
  };

  return (
    <section>
      <div className="register">
        <div className="col-2">
          <img src="/images/sign.jpeg" alt="Sign In" />
        </div>
        <div className="col-1">
          <h2>Login admin</h2>
          <span>Register and enjoy the service</span>

          <form
            id="form"
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
            />
            <input type="password" {...register("password")} placeholder="Password" />

            {/* Other form fields go here */}

            
            

          </form>
    
          {/* Google Sign-In Button */}
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"  // Replace with your Google API client ID
            buttonText="Continue with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
    </section>
  );
}
