import { useState } from "react";
import { classNames } from "../../lib/helpers/design";
import ModalCreateNftAirdrop from "./modal-create-nft-airdrop";

import NextIcon from "../../components-shared/next-icon";
import { Button } from "../../components-shared/shared/utilities/form/button";

const NftAirdropActionCreate = ({ loadData }: { loadData: () => void }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        className={classNames(
          "w-8 h-9 rounded outline-none focus:outline-none",
          "mr-1 mb-1 ease-linear transition-all duration-150")}
        outline
        icon={<NextIcon  name='FcPlus' className="text-xl" />}
        onClick={openModal}
      />
      {open && <ModalCreateNftAirdrop open={open} setOpen={setOpen} loadData={loadData} /> }
    </>
  );
};

export default NftAirdropActionCreate;
