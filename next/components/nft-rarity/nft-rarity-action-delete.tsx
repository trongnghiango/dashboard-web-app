import { useState } from "react";
import { NftRarity } from "../../lib/modules/nft-rarity/nft-rarity.model";
import ModalDeleteNftRarity from "./modal-delete-nft-rarity";

import NextIcon from "../../components-shared/next-icon";

type Model = NftRarity;

const NftRarityActionDelete = ({
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
        <ModalDeleteNftRarity
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftRarityActionDelete;
