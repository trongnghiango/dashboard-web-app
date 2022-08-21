import { useState } from "react";
import { NftElement } from "../../lib/modules/nft-element/nft-element.model";
import ModalUpdateNftElement from "./modal-update-nft-element";

import NextIcon from "../../components-shared/next-icon";

type Model = NftElement;

const NftElementActionUpdate = ({
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
        <ModalUpdateNftElement
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftElementActionUpdate;
