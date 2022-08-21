import { useState } from "react";
import { NftAirdrop } from "../../lib/modules/nft-airdrop/nft-airdrop.model";
import ModalDeleteNftAirdrop from "./modal-delete-nft-airdrop";

import NextIcon from "../../components-shared/next-icon";

type Model = NftAirdrop;

const NftAirdropActionDelete = ({
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
        <ModalDeleteNftAirdrop
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default NftAirdropActionDelete;
