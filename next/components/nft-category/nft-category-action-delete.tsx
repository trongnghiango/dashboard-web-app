import { useState } from "react";
import { NftCategory } from "../../lib/modules/nft-category/nft-category.model";
import ModalDeleteNftCategory from "./modal-delete-nft-category";

import NextIcon from "../../components-shared/next-icon";

type Model = NftCategory;

const NftCategoryActionDelete = ({
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
        <NextIcon  name='FcEmptyTrash' className="" /> Delete
      </button>
      {open && (
        <ModalDeleteNftCategory
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftCategoryActionDelete;
