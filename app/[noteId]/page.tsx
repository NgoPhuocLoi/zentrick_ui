import { getFileContentById } from "@/caller/file-content-caller";
import FileDetail from "./_components/FileDetail";

const Page = async ({ params }: { params: Promise<{ noteId: string }> }) => {
  const { noteId } = await params;
  const fileContent = await getFileContentById(noteId);
  return fileContent && <FileDetail fileContent={fileContent} />;
};

export default Page;
