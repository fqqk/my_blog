import Ancher from "atom/ancher";
import { useState } from "react";

type Props = {
  category: string;
};

const TagsList = ({ category }: Props) => {
  const [open, isOpen] = useState(0);

  const onClickCategorySearch = () => {
    console.log(category);
  };

  return <button onClick={onClickCategorySearch}>{category}</button>;
};

export default TagsList;
