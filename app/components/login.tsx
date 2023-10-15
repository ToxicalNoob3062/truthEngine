import { signIn } from "next-auth/react";

export default function LoginCard() {
  return (
    <div className="border-4 border-orange-200 p-4 w-[96%] sm:w-[75%] md:w-[50%] mx-auto rounded-lg shadow-md my-4">
      <img className="mx-auto h-52" src="signup.webp" alt="signup" />
      <h2 className="text-2xl text-center font-serif font-extrabold text-orange-700">
        Hey!!👋 Great To see you here!😎
      </h2>
      <br />
      <div className="flex border border-black rounded-md bg-blue-500  w-[80%] sm:w-[50%] md:w-[70%] mx-auto">
        <div className="w-10 p-3 bg-white rounded-md ">
          <img src="google.webp" alt="google" className="w-full" />
        </div>
        <button
          onClick={() => signIn("google")}
          className="text-white w-[80%] p-2"
          type="button"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
