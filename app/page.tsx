import QuickAction from "@/components/common/QuickAction";
import { Folder, List } from "lucide-react";

const quickListActions = [
  { name: "Transition List", href: "/transition", icon: List },
  { name: "Add New Transition", href: "/transition/add", icon: Folder },
  { name: "Category List", href: "/category", icon: List },
  { name: "Add New Category", href: "/category/add", icon: Folder },
];
export default function Home() {

  return (
    <div className="px-2 py-2 sm:px-2 sm:py-2 md:px-4 md:py-4 grid grid-cols-6 gap-2">
      <div className="grid grid-cols-2 col-span-2 h-70 gap-1">
        <div className="border"></div>
        <div className="border"></div>
        <div className="border"></div>
        <div className="border"></div>
      </div>
      <div className="border col-span-4"></div>
      <div className="border col-span-2"></div>
      <div className="border col-span-2"></div>
      <div className="border"></div>
      <div className="h-52 grid gap-2">
        {quickListActions.map(action => (
          <QuickAction {...action} key={action.href} />
        ))}
      </div>
      <div className="border col-span-2 h-46"></div>
      <div className="border col-span-2"></div>
      <div className="border col-span-2"></div>
    </div>
  );
}
