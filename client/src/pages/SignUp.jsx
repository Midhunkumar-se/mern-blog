import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* {left} */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center whitespace-nowrap font-semibold dark:text-white"
          >
            <span className="font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Midhun
            </span>
            <span className="text-[12px]">.Blog</span>
          </Link>
          <p className="text-sm mt-3">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-5">
            <div>
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
