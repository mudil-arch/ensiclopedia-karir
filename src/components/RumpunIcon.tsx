import React from "react";
import {
  HeartPulse,
  GraduationCap,
  Cpu,
  Briefcase,
  Wrench,
  Sprout,
  Palette,
  Scale,
  Truck,
  Compass,
  FolderKanban,
} from "lucide-react";

export function RumpunIcon({
  name,
  className = "w-6 h-6",
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "HeartPulse":
      return <HeartPulse className={className} aria-hidden="true" />;
    case "GraduationCap":
      return <GraduationCap className={className} aria-hidden="true" />;
    case "Cpu":
      return <Cpu className={className} aria-hidden="true" />;
    case "Briefcase":
      return <Briefcase className={className} aria-hidden="true" />;
    case "Wrench":
      return <Wrench className={className} aria-hidden="true" />;
    case "Sprout":
      return <Sprout className={className} aria-hidden="true" />;
    case "Palette":
      return <Palette className={className} aria-hidden="true" />;
    case "Scale":
      return <Scale className={className} aria-hidden="true" />;
    case "Truck":
      return <Truck className={className} aria-hidden="true" />;
    case "Compass":
      return <Compass className={className} aria-hidden="true" />;
    default:
      return <FolderKanban className={className} aria-hidden="true" />;
  }
}

