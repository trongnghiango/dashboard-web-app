import { useState } from "react";
import { NftRarity } from "../../lib/modules/nft-rarity/nft-rarity.model";
import ModalUpdateNftRarity from "./modal-update-nft-rarity";

import NextIcon from "../../components-shared/next-icon";

type Model = NftRarity;

const NftRarityActionUpdate = ({
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
        <ModalUpdateNftRarity
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftRarityActionUpdate;
