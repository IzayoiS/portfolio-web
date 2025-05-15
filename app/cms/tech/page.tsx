"use client";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteTechStack, useTechStacks } from "@/hooks/use-tech";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import AddTechStack from "./components/addTechStack";
import EditTechStack from "./components/editTechStack";

export default function TechPage() {
  const { data: techStacks, isLoading } = useTechStacks();
  const { mutate: deleteTech } = useDeleteTechStack();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <TailSpin visible={true} height={50} width={50} color="#fff" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-row gap-5 items-center mb-6">
        <h1 className="text-2xl font-bold">List Tech Stack</h1>
        <i className="text-zinc-400">
          Right click for delete,left click for edit!
        </i>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-auto text-md font-semibold bg-slate-800 text-zinc-200 rounded-xl px-4 py-2 cursor-pointer">
              ADD
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black text-zinc-100 w-100">
            <DialogTitle>Add Tech</DialogTitle>
            <AddTechStack />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-5">
        {techStacks.map((tech: { id: number; name: string; icon: string }) => (
          <ContextMenu key={tech.id}>
            <ContextMenuTrigger>
              <ContextMenuContent className="bg-black border-gray-500 text-zinc-100 p-0">
                <ContextMenuItem
                  className="focus:text-zinc-100 focus:bg-muted/10 cursor-pointer"
                  onClick={() => deleteTech(tech.id)}
                >
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex flex-col items-center justify-center gap-2 p-2 w-50 border border-slate-700 rounded-xl bg-slate-900 hover:scale-101 cursor-pointer transition-transform h-full">
                    <Image
                      src={tech.icon}
                      alt={tech.name}
                      width={60}
                      height={60}
                      className="m-auto"
                    />
                    <span className="text-lg font-semibold text-zinc-100 mt-auto">
                      {tech.name}
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black text-zinc-100 w-100">
                  <DialogTitle>Edit Tech</DialogTitle>
                  <EditTechStack onClose={() => {}} tech={tech} />
                </DialogContent>
              </Dialog>
            </ContextMenuTrigger>
          </ContextMenu>
        ))}
      </div>
    </div>
  );
}
