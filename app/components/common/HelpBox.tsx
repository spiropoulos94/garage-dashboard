import { DictionaryRoot } from "@/app/(pages)/[lang]/dictionaries/dictionaries";

interface HelpBoxProps {
  dictionary: DictionaryRoot;
}

const HelpBox = ({ dictionary }: HelpBoxProps) => {
  return (
    <div
      className={
        "helpNeededHint bottom-8 mt-auto flex flex-col gap-2 rounded-md border border-gray-200 bg-gray-50 p-2 font-medium xl:py-3"
      }
    >
      <span className={"text-sm font-medium text-gray-900"}>{dictionary.sidebar.needhelp}</span>
      <div className=" flex flex-col gap-1 text-sm font-normal leading-5 text-gray-700 xl:text-xs xl:leading-4">
        <a className={"display-block"} href={"tel:+4989244182019"}>
          +49 89 244 182 019
        </a>
        <a
          className={"display-block text-gray-700 underline underline-offset-2"}
          href={"mailto: werkstattmeister@repareo.de"}
        >
          E-Mail senden
        </a>
      </div>
    </div>
  );
};

export default HelpBox;
