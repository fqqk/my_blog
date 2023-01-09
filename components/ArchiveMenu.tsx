type Props = {
  years: string[];
};

const ArchiveMenu = ({ years }: Props) => {
  const archiveList = years.map((year) => {
    return (
      <li>
        <a
          href={"#" + year}
          className="border-b border-pink-500 sp:text-xs tab:text-sm pc:text-lg hover:text-pink-500 duration-200"
        >
          {year}
        </a>
      </li>
    );
  });
  return (
    <div className="pt-32 w-4/6 mx-auto">
      <h3 className="font-bold mb-2 sp:text-xl tab:text-2xl pc:text-3xl">
        Archive
      </h3>
      <ul className="flex sp:space-x-4 tab:space-x-6 pc:space-x-8">
        {archiveList}
      </ul>
    </div>
  );
};

export default ArchiveMenu;
