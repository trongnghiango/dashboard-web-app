import { useState } from "react";
import { ReferralTransaction } from "../../lib/modules/referral-transaction/referral-transaction.model";
import ModalDeleteReferralTransaction from "./modal-delete-referral-transaction";

import NextIcon from "../../components-shared/next-icon";

type Model = ReferralTransaction;

const ReferralTransactionActionDelete = ({
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
        <ModalDeleteReferralTransaction
          data={data}
          open={open}
          setOpen={setOpen}
          loadData={loadData}
        />
      )}
    </>
  );
};

export default ReferralTransactionActionDelete;
