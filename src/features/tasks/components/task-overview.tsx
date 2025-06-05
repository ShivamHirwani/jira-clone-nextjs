// import { PencilIcon } from "lucide-react";

// import { DottedSeparator } from "@/components/dotted-separator";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { snakeCaseToTitleCase } from "@/lib/utils";

// import { MemberAvatar } from "@/features/members/components/member-avatar";

// import { OverviewProperty } from "./overview-property";
// import { TaskDate } from "./task-date";

// import { useEditTaskModal } from "../hooks/use-edit-task-modal";
// import { Task } from "../types";

// interface TaskOverviewProps {
//   task: Task;
// }

// export const TaskOverview = ({ task }: TaskOverviewProps) => {
//   const { open } = useEditTaskModal();

//   return (
//     <div className="flex flex-col gap-y-4 col-span-1">
//       <div className="bg-muted rounded-lg p-4">
//         <div className="flex items-center justify-between">
//           <p className="text-lg font-semibold">Overview</p>
//           <Button onClick={() => open(task.$id)} size="sm" variant="secondary">
//             <PencilIcon className="size-4 mr-2" />
//             Edit
//           </Button>
//         </div>
//         <DottedSeparator className="my-4" />
//         <div className="flex flex-col gap-y-4">
//           <OverviewProperty label="Assignee">
//             <MemberAvatar name={task.assignee.name} className="size-6" />
//             <p className="text-sm font-medium">{task.assignee.name}</p>
//           </OverviewProperty>
//           <OverviewProperty label="Due Date">
//             <TaskDate value={task.dueDate} className="text-sm font-medium" />
//           </OverviewProperty>
//           <OverviewProperty label="Status">
//             <Badge variant={task.status}>
//               {snakeCaseToTitleCase(task.status)}
//             </Badge>
//           </OverviewProperty>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { useState } from "react";
import { PencilIcon, SendIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { snakeCaseToTitleCase } from "@/lib/utils";

import { MemberAvatar } from "@/features/members/components/member-avatar";
import { OverviewProperty } from "./overview-property";
import { TaskDate } from "./task-date";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

import { Task } from "../types";

interface TaskOverviewProps {
  task: Task;
}

export const TaskOverview = ({ task }: TaskOverviewProps) => {
  const { open } = useEditTaskModal();
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "You" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      {/* Overview Panel */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>
          <Button onClick={() => open(task.$id)} size="sm" variant="secondary">
            <PencilIcon className="size-4 mr-2" />
            Edit
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>
          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>
          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>

      {/* Chat Box */}
      <div className="bg-muted rounded-lg p-4 h-72 flex flex-col">
        <p className="text-lg font-semibold mb-2">Task Chat</p>
        <div className="flex-1 overflow-y-auto bg-white p-2 rounded mb-2 shadow-inner">
          {messages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center mt-6">
              No messages yet.
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className="mb-2">
                <p className="text-xs font-bold">{msg.sender}</p>
                <p className="text-sm">{msg.text}</p>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="icon" variant="default">
            <SendIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
