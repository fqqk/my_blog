type Props = {
  year: string;
};

const ArchiveSection = ({ year }: Props) => {
  return (
    <section className="w-5/6 mx-auto mt-32 mb-10">
      <h1
        className="font-bold text-pink-500 sp:text-2xl tab:text-3xl pc:text-4xl"
        id={year}
      >
        {year}
      </h1>
    </section>
  );
};

export default ArchiveSection;
