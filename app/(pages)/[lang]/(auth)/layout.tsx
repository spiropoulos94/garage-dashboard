import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garage Dashboard",
  description: "Garage Dashboard",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="authLayout w-full bg-gray-50 ">{children}</main>;
}
