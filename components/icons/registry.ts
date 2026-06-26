import {
  BookOpen,
  Briefcase,
  Building2,
  CalendarClock,
  CalendarRange,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Handshake,
  Headphones,
  Headset,
  Mail,
  Megaphone,
  Mic,
  PencilRuler,
  PenLine,
  Phone,
  PlayCircle,
  Receipt,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Users,
  Globe,
  Video,
  type LucideIcon,
} from "lucide-react";

/**
 * Registry mapping string names (stored in dictionaries) to lucide icon
 * components. Lets content reference icons by name without dynamic imports.
 * Extend this map as new sections adopt icon-by-name.
 */
export const ICON_REGISTRY: Record<string, LucideIcon> = {
  BookOpen,
  Briefcase,
  Building2,
  CalendarClock,
  CalendarRange,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Handshake,
  Headphones,
  Headset,
  Mail,
  Megaphone,
  Mic,
  PencilRuler,
  PenLine,
  Phone,
  PlayCircle,
  Receipt,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Users,
  Globe,
  Video,
};

/** Resolve an icon by name, falling back to GraduationCap when unknown. */
export function getIcon(name?: string): LucideIcon {
  if (!name) return GraduationCap;
  return ICON_REGISTRY[name] ?? GraduationCap;
}
