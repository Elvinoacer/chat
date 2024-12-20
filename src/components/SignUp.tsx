import Image from "next/image";
import image from "../assets/images/IMG_20241219_120855_130+(1).jpg";
import { SocketType } from "@/app/page";
// const webImage =
//   "https://classmind-general-uploads.s3.eu-north-1.amazonaws.com/IMG_20241219_120855_130+(1).jpg";
// "https://classmind-general-uploads.s3.eu-north-1.amazonaws.com/Elvin-img-compressed.webp";

const SignUp = ({
  user,
  socket,
  input,
  setInput,
}: {
  user: { current: { id: string | undefined; name: string } | null };
  socket: SocketType;
  input: string;
  setInput: (val: string) => void;
}) => {
  console.log(setInput);
  const addUser = () => {
    console.log(input);
    user.current = { name: input, id: socket.id };
    socket.emit("new_user", { user: input });
    setInput("");
  };

  return (
    <div className="w-full h-full flex flex=col items-center justify-center">
      <div className="text-center grid grid-rows-3 gap-2 gradient p-8 rounded-md">
        <h1 className="text-5xl font-bold text-white">Chat With Me</h1>
        <div className="h-14 w-14 mx-auto border-[1px] flex items-center justify-center rounded-full overflow-hidden">
          <Image
            className="w-full h-full"
            width={56}
            height={56}
            src={
              image
              // "https://classmind-general-uploads.s3.eu-north-1.amazonaws.com/IMG_20241219_120855_130+(1).jpg"
            }
            alt="Elvin Image"
          />
        </div>
        <h2 className="text-2xl text-white">Enter you name to join</h2>
        <input
          type="text"
          className="text-2xl text-center rounded-md p-2 my-2 text-blue-400 placeholder-blue-300 focus:outline-none"
          placeholder="..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
        />
        <button
          className={`text-xl w-full text-white font-bold py-2 px-3 rounded-md ${
            input ? "bg-sky-400" : "bg-slate-400"
          }`}
          disabled={!input}
          onClick={addUser}
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default SignUp;
