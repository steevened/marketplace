// "use client";

import { pgEnum } from "drizzle-orm/pg-core";

// import { Input } from "@/components/ui/input";
// import React, { useEffect } from "react";

// import { ToolInvocation } from "ai";
// import { useChat } from "ai/react";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const { messages, input, handleInputChange, handleSubmit, addToolResult } =
//     useChat({
//       // async onToolCall({ toolCall }) {
//       //   if (toolCall.toolName === "getLocation") {
//       //     const cities = [
//       //       "New York",
//       //       "Los Angeles",
//       //       "Chicago",
//       //       "San Francisco",
//       //     ];
//       //     return cities[Math.floor(Math.random() * cities.length)];
//       //   }
//       // },
//     });

//   const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     handleInputChange(e);
//     console.log("changed");
//   };

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, [inputRef]);

//   console.log(messages);
//   return (
//     <div className="flex items-center justify-center h-[calc(100svh-128px)] ">
//       {/* <div className="grid gap-2 w-11/12 max-w-lg mx-auto  ">
//         <form onSubmit={handleSubmit} className="flex gap-2 items-center ">
//           <Input
//             type="text"
//             value={input}
//             onChange={onInputChange}
//             placeholder="Buscar"
//             name=""
//             ref={inputRef}
//           />
//         </form>

//         <div>
//           {messages.map((message) => (
//             <p key={message.id}>{message.content}</p>
//           ))}
//         </div>
//       </div> */}
//     </div>
//   );
// }

// {
//   /* <div className="flex flex-col h-screen bg-gray-100">
// <div className="flex-1 overflow-y-auto p-4">
//   {messages.map((message) => (
//     <div
//       key={message.id}
//       className={`mb-4 ${
//         message.role === "user" ? "text-right" : "text-left"
//       }`}
//     >
//       <div
//         className={`inline-block p-3 rounded-lg ${
//           message.role === "user"
//             ? "bg-blue-500 text-white"
//             : "bg-white text-gray-800"
//         }`}
//       >
//         {message.content}
//         {message.toolInvocations?.map(
//           (toolInvocation: ToolInvocation) => {
//             const toolCallId = toolInvocation.toolCallId;
//             const addResult = (result: string) =>
//               addToolResult({ toolCallId, result });

//             // render confirmation tool (client-side tool with user interaction)
//             if (toolInvocation.toolName === "weather") {
//               return (
//                 <div key={toolCallId}>
//                   {toolInvocation.args.message}
//                   <div>
//                     {"result" in toolInvocation ? (
//                       <b>{toolInvocation.result}</b>
//                     ) : (
//                       <>
//                         <button onClick={() => addResult("Yes")}>
//                           Yes
//                         </button>
//                         <button onClick={() => addResult("No")}>
//                           No
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               );
//             }

//             // other tools:
//             return "result" in toolInvocation ? (
//               <div key={toolCallId}>
//                 Tool call {`${toolInvocation.toolName}: `}
//                 {toolInvocation.result}
//               </div>
//             ) : (
//               <div key={toolCallId}>
//                 Calling {toolInvocation.toolName}...
//               </div>
//             );
//           }
//         )}
//       </div>
//     </div>
//   ))}
// </div>
// <form
//   onSubmit={handleSubmit}
//   className="p-4 bg-white border-t border-gray-200"
// >
//   <div className="flex items-center">

//     <button
//       type="submit"
//       className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//     >
//       Send
//     </button>
//   </div>
// </form>
// </div> */
// }

export default function Page() {
  return <div></div>;
}
