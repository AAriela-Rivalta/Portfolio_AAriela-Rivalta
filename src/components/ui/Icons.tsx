import type { IconType } from "react-icons";
import { SiDotnet } from "react-icons/si";
import {
  TbBrandCSharp,
  TbBrandCss3,
  TbBrandGit,
  TbBrandGithub,
  TbBrandHtml5,
  TbBrandJavascript,
  TbBrandNextjs,
  TbBrandNodejs,
  TbBrandReact,
  TbBrandReactNative,
  TbBrandTailwind,
  TbBrandTypescript,
  TbSparkles,
  TbSql,
} from "react-icons/tb";
import type { IconName } from "@/data/profile";

/** Íconos del stack. Set Tabler: trazo uniforme y monocromo. */
export const stackIcons: Record<IconName, IconType> = {
  react: TbBrandReact,
  "react-native": TbBrandReactNative,
  nextjs: TbBrandNextjs,
  typescript: TbBrandTypescript,
  javascript: TbBrandJavascript,
  tailwind: TbBrandTailwind,
  html: TbBrandHtml5,
  css: TbBrandCss3,
  nodejs: TbBrandNodejs,
  csharp: TbBrandCSharp,
  dotnet: SiDotnet,
  sql: TbSql,
  git: TbBrandGit,
  github: TbBrandGithub,
  ai: TbSparkles,
};

export function StackIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = stackIcons[name];
  return <Icon aria-hidden="true" focusable="false" className={className} />;
}
