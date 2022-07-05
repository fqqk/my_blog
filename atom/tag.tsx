import { useState } from "react";

type Props = {
  category: string;
};

const Tag = ({ category }: Props) => {
  const [open, isOpen] = useState(0);

  const onClickCategorySearch = () => {
    console.log(category);
  };

  return (
    <div className="bg-pink-500">
      <button className="bg-pink-500 hover:bg-pink-400 text-black  py-2 px-4 rounded-full">
        {category}
      </button>
    </div>
  );
};

export default Tag;
