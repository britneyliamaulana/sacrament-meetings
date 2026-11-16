
import NavLinks from "@/components/NavLinks";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavLinks />
      {children}
    </>
  );
}
