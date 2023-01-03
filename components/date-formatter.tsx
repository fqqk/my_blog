import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);

  return (
    <time dateTime={dateString} className="sp:text-xs tab:text-sm pc:text-lg">
      {format(date, "yyyy.MM.dd")}
    </time>
  );
};

export default DateFormatter;
