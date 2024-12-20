import { ChatType } from "@/app/page";
import Image from "next/image";

const Message = ({ content, type, own, user }: ChatType) => {
  return (
    <p className={`message px-1 md:px-6 py-1 flex ${own && "justify-end"}`}>
      {!own && (
        <span
          className={`logo text-2xl bg-blue-600 text-white rounded-full py-2 text-center px-4 mr-2 flex items-center ${
            type === "text" ? "my-auto" : "max-h-12"
          }`}
        >
          {user && user.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span
        className={`text-xl md:text-3xl py-2 rounded-2xl 
            ${type === "text" ? "px-6" : "px-2"}
            ${own ? "bg-sky-400 text-white" : " bg-slate-300"}
            `}
      >
        {type === "text" ? (
          content
        ) : (
          <Image src={content} className="rounded-md" alt="image" fill />
        )}
      </span>
    </p>
  );
};

export default Message;
