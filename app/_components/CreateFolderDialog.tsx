"use client";
import { createNoteObject } from "@/caller/note-object-caller";
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
import { NoteObjectType } from "@/interface/note-object";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { FolderPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { rootNoteObjectsAtom } from "../_atoms/note-objects-atom";

const folderFormSchema = z.object({
  name: z
    .string()
    .min(1, "Folder name is required")
    .max(100, "Name is too long"),
});

export function CreateFolderDialog() {
  const [open, setOpen] = useState(false);
  const [, setRootNoteObjects] = useAtom(rootNoteObjectsAtom);
  const form = useForm<z.infer<typeof folderFormSchema>>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: z.infer<typeof folderFormSchema>) {
    try {
      const result = await createNoteObject({
        title: values.name,
        parentId: undefined, // Assuming root folder creation
        type: NoteObjectType.FOLDER, // Adjust based on your NoteObjectType definition
      });

      if (result) {
        setRootNoteObjects((prev) => [...prev, result]);
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
        <div className="py-1 px-2 hover:bg-gray-200 rounded-md">
          <FolderPlus size={20} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Create new folder</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
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
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
