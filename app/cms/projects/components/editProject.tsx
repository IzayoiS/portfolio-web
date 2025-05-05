import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export interface Project {
  projectName: string;
  descriptions: string;
  techStack: string[];
  linkGithub: string;
  linkWebsite: string;
  logo: File | null;
}

export default function EditProject({ data }: { data: Project | null }) {
  const [projectName, setProjectName] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [techStack, setTechStack] = useState<string[]>([""]);
  const [linkGithub, setLinkGithub] = useState("");
  const [linkWebsite, setLinkWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      setProjectName(data.projectName || "");
      setDescriptions(data.descriptions || "");
      setTechStack(data.techStack || [""]);
      setLinkGithub(data.linkGithub || "");
      setLinkWebsite(data.linkWebsite || "");
      setLogo(data.logo || null);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProject: Project = {
      projectName,
      descriptions,
      techStack,
      linkGithub,
      linkWebsite,
      logo,
    };

    console.log("Updated project data:", updatedProject);
    // Submit ke backend...
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black text-slate-200 p-6 rounded shadow flex flex-col gap-4"
    >
      <label>Project Name *</label>
      <Input
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />

      <label>Descriptions *</label>
      <div className="flex items-center gap-2">
        <Textarea
          value={descriptions}
          className="resize-none w-full"
          rows={2}
        />
      </div>

      <label>Tech Stack</label>
      <Input
        value={techStack}
        onChange={(e) =>
          setTechStack(e.target.value.split(",").map((s) => s.trim()))
        }
      />

      <label>Link Github</label>
      <Input
        value={linkGithub}
        onChange={(e) => setLinkGithub(e.target.value)}
      />

      <label>Website URL</label>
      <Input
        value={linkWebsite}
        onChange={(e) => setLinkWebsite(e.target.value)}
      />

      <label>Logo</label>
      <Input
        type="file"
        onChange={(e) => setLogo(e.target.files?.[0] || null)}
      />

      <Button type="submit" className="mt-4 w-full">
        Update Project
      </Button>
    </form>
  );
}
