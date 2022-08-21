import { useState } from "react";
import { NftType } from "../../lib/modules/nft-type/nft-type.model";
import ModalDeleteNftType from "./modal-delete-nft-type";

import NextIcon from "../../components-shared/next-icon";

type Model = NftType;

const NftTypeActionDelete = ({
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
        <ModalDeleteNftType
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftTypeActionDelete;
