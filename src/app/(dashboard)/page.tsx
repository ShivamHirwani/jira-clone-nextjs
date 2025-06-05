import { getCurrent } from "@/features/auth/queries";
import { getWorkspaces } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";
import ChatPopup from "@/components/ChatPopup";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");
  <ChatPopup />;

  const workspaces = await getWorkspaces();

  if (workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }

  // Optionally, return null or a fallback UI
  return null;
}
