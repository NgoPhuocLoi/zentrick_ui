import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import FileTabs from "./file-tabs";
import MarkdownView from "./markdown-view";
import { getNoteObjects } from "@/caller/note-object-caller";

export default async function Page() {
  const rootNoteObjects = await getNoteObjects({ root: true });
  return (
    <SidebarProvider>
      <AppSidebar rootNoteObjects={rootNoteObjects} />
      <SidebarInset>
        <header className="flex h-10 shrink-0 items-center gap-2 border-b px-4 pt-1 bg-gray-100">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <FileTabs />
        </header>
        <div className="w-full">
          <MarkdownView />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
