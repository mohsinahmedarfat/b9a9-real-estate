import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { login, googleLogin, githubLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("from login", location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    // login
    login(email, password)
      .then((result) => {
        console.log(result);
        // navigate after login
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        if (error) {
          toast.error("Invalid email or password. Check and try again.");
        }
      });
  };

  return (
    <div className="my-10">
      <h1 className="text-3xl text-center mb-5 font-bold">Please Login!</h1>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100  mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body pb-0  ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 mt-2">This field is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 mt-2">This field is required</span>
            )}

            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
            <p className="text-center mt-3">
              Do not have an account?{" "}
              <Link className="text-blue-500 font-bold" to="/register">
                Register
              </Link>
            </p>
          </div>
        </form>
        <hr className="my-5 mx-8 " />
        <div className=" space-y-3 mb-6 px-8">
          <button onClick={googleLogin} className="btn w-full">
            <FaGoogle />
            Login with Google
          </button>
          <button onClick={githubLogin} className="btn w-full">
            <FaGithub />
            Login with Github
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
