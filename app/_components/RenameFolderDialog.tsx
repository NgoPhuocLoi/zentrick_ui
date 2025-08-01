"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NoteObject } from "@/interface/note-object";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { FolderPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { rootNoteObjectsAtom } from "../_atoms/note-objects-atom";
import { updateNoteObjectTitle } from "../_utils/note-object-util";

const folderFormSchema = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(100, "Name is too long"),
});

interface RenameFolderDialogProps {
  initialNoteObject: NoteObject;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function RenameFolderDialog({
  initialNoteObject,
  open,
  setOpen,
}: RenameFolderDialogProps) {
  const [, setRootNoteObjects] = useAtom(rootNoteObjectsAtom);
  const form = useForm<z.infer<typeof folderFormSchema>>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof folderFormSchema>) {
    try {
      const result = await updateNoteObjectTitle(
        initialNoteObject.id,
        values.name
      );

      if (result) {
        setRootNoteObjects((prev) => {
          return prev.map((obj) =>
            obj.id === initialNoteObject.id
              ? { ...obj, title: values.name }
              : obj
          );
        });
        setOpen(false);
        form.reset();
      }
      console.log(values, { result });
      console.log("Creating folder with name:", values.name);
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-2">
          <FolderPlus />
          Rename
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Rename folder</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              defaultValue={initialNoteObject.title}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder name</FormLabel>
                  <FormControl>
                    <Input placeholder="Folder name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">OK</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
