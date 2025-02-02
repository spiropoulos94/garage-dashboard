import ModalRenderer from "@/app/containers/modals/base/ModalRenderer";
import { ModalContextProvider } from "@/app/contexts/ModalContext";
import { getDictionary } from "./dictionaries/dictionaries";
import { DictionaryContextProvider } from "@/app/contexts/DictionaryContext";
import Scripts from "@/app/components/Scripts";
import "@/app/globals.css";

interface GeneralLayoutProps {
  params: {
    lang: string;
  };
  children: React.ReactNode;
}

// this wraps the whole app including auth and dashboard layouts
const GeneralLayout = async ({ params, children }: GeneralLayoutProps) => {
  const t = await getDictionary(params.lang || "en_US");
  return (
    <html lang="en">
      <DictionaryContextProvider dictionary={t}>
        <ModalContextProvider>
          <body id="root" className="h-screen">
            <Scripts />
            <ModalRenderer>{children}</ModalRenderer>
          </body>
        </ModalContextProvider>
      </DictionaryContextProvider>
    </html>
  );
};

export default GeneralLayout;
