import type { Metadata } from "next";
import { MenuItemProps } from "@/app/components/common/MenuItem";
import { getDictionary } from "../dictionaries/dictionaries";
import NavigationLayout from "@/app/containers/Navigation/NavigationLayout";

export const metadata: Metadata = {
  title: "Garage Dashboard",
  description: "Garage Dashboard",
};

interface RootLayoutProps {
  params: {
    lang: string;
  };
  children: React.ReactNode;
}

const RootLayout = async ({ params, children }: RootLayoutProps) => {
  const t = await getDictionary(params.lang);

  const sidebarItems: MenuItemProps[] = [
    {
      href: "/bookings",
      title: t.sidebar.bookings,
      icon: <i className={`fa-light fa-calendar fa-fw mr-2 text-2xl text-gray-700`} />,
    },
    {
      href: "https://repareo.notion.site/Der-eBay-Werkstattservice-mit-repareo-Los-gehts-a71e87b45ab7418e92b4cfbdabda6b9d",
      title: t.sidebar.handbook,
      target: "_blank",
      icon: <i className={`fa-light fa-book fa-fw mr-2 text-2xl text-gray-700`} />,
    },
  ];

  return <NavigationLayout navItems={sidebarItems}>{children}</NavigationLayout>;
};

export default RootLayout;
