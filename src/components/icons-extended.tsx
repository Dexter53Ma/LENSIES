// Re-exports from lucide-react for icons used in newer components.
import {
  Check,
  Sparkles,
  Calendar,
  Clock,
  Wallet,
  User,
  MapPin,
  Camera,
  ArrowLeft,
  ArrowRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
} from "lucide-react";
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export const CheckIcon = (props: IconProps) => <Check {...props} />;
export const SparklesIcon = (props: IconProps) => <Sparkles {...props} />;
export const CalendarIcon = (props: IconProps) => <Calendar {...props} />;
export const ClockIcon = (props: IconProps) => <Clock {...props} />;
export const WalletIcon = (props: IconProps) => <Wallet {...props} />;
export const UserIcon = (props: IconProps) => <User {...props} />;
export const MapPinIcon = (props: IconProps) => <MapPin {...props} />;
export const CameraIcon = (props: IconProps) => <Camera {...props} />;
export const ZoomInIcon = (props: IconProps) => <ZoomIn {...props} />;
export const ZoomOutIcon = (props: IconProps) => <ZoomOut {...props} />;
export const Maximize2Icon = (props: IconProps) => <Maximize2 {...props} />;
export const Minimize2Icon = (props: IconProps) => <Minimize2 {...props} />;
export { ArrowLeft as ArrowLeftIconLucide, ArrowRight as ArrowRightIconLucide, X as XIconLucide };
