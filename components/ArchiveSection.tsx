type Props = {
  year: string;
};

const ArchiveSection = ({ year }: Props) => {
  return (
    <section className="w-4/6 mx-auto mt-32 mb-10">
      <h1
        className="font-bold text-pink-500 sp:text-3xl tab:text-4xl pc:text-5xl"
        id={year}
      >
        {year}
      </h1>
    </section>
  );
};

export default ArchiveSection;
