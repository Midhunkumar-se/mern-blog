import { Button } from "flowbite-react";
import portfolio from "../assets/portfolio.png";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Would you like to see more of my projects?</h2>
        <p className="text-gray-500 my-2">
          Check out those projects by clicking the button below.
        </p>
        <a
          href="https://midhunkumar.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >
          <Button
            gradientDuoTone="purpleToPink"
            className="w-full rounded-tl-xl rounded-bl-none"
          >
            My Portfolio
          </Button>
        </a>
      </div>
      <div className="p-7 flex-1">
        <img src={portfolio} />
      </div>
    </div>
  );
}
