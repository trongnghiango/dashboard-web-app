import { useState } from "react";
import { NftCategory } from "../../lib/modules/nft-category/nft-category.model";
import ModalUpdateNftCategory from "./modal-update-nft-category";

import NextIcon from "../../components-shared/next-icon";

type Model = NftCategory;

const NftCategoryActionUpdate = ({
  data,
  loadData,
}: {
  data: Model;
  loadData: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        className="text-primary-dark hover:underline py-1 px-3 border-0 bg-none flex gap-1  items-center"
        onClick={openModal}
      >
        <NextIcon  name='FcEditImage' className="" /> Update
      </button>
      {open && (
        <ModalUpdateNftCategory
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftCategoryActionUpdate;
