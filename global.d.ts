declare module 'lucide-react' {
  import * as React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
    className?: string;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const ArrowRight: LucideIcon;
  export const ArrowUpDown: LucideIcon;
  export const Banknote: LucideIcon;
  export const Building2: LucideIcon;
  export const Calendar: LucideIcon;
  export const Car: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Clock: LucideIcon;
  export const Compass: LucideIcon;
  export const CreditCard: LucideIcon;
  export const Download: LucideIcon;
  export const Eye: LucideIcon;
  export const Facebook: LucideIcon;
  export const Heart: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const History: LucideIcon;
  export const Home: LucideIcon;
  export const Info: LucideIcon;
  export const Instagram: LucideIcon;
  export const Layers: LucideIcon;
  export const Leaf: LucideIcon;
  export const Linkedin: LucideIcon;
  export const Lock: LucideIcon;
  export const LogOut: LucideIcon;
  export const Mail: LucideIcon;
  export const MapPin: LucideIcon;
  export const Maximize2: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Minus: LucideIcon;
  export const Package: LucideIcon;
  export const Phone: LucideIcon;
  export const PhoneCall: LucideIcon;
  export const Plus: LucideIcon;
  export const Printer: LucideIcon;
  export const QrCode: LucideIcon;
  export const RotateCcw: LucideIcon;
  export const Ruler: LucideIcon;
  export const Search: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const SlidersHorizontal: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Star: LucideIcon;
  export const Tag: LucideIcon;
  export const Trash2: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Truck: LucideIcon;
  export const User: LucideIcon;
  export const Users: LucideIcon;
  export const WifiOff: LucideIcon;
  export const X: LucideIcon;
  export const ZoomIn: LucideIcon;
  export const AlertCircle: LucideIcon;

  export const icons: Record<string, LucideIcon>;
  const defaultExport: Record<string, LucideIcon>;
  export default defaultExport;
}
