import { useEffect, useState } from "react";
import { classNames } from "../../lib/helpers/design";
import ModalCreateNft from "./modal-create-nft";

import NextIcon from "../../components-shared/next-icon";
import { Button } from "../../components-shared/shared/utilities/form/button";
import { setLoading } from "../../redux/actions/loading.action";
import { useDispatch } from "../../redux/store";
import { NftService } from "../../lib/modules/nft/nft.repo";
import { Nft } from "../../lib/modules/nft/nft.model";

const NftActionCreate = ({ loadData }: { loadData: () => void }) => {
  const [open, setOpen] = useState(false);
  const [lastNft, setLastNft] = useState<Nft>();
  const dispatch = useDispatch();

  useEffect(() => {
    loadLastNft();
  }, []);

  const openModal = () => {
    setOpen(true);
  };

  const loadLastNft = () => {
    setLoading(true)(dispatch);
    NftService.getAll({
      query: {
        limit: 1,
        order: {
          _id: -1,
        },
      },
    })
      .then((res) => {
        setLastNft(res.data[0]);
        setLoading(false)(dispatch);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
      });
  };

  return (
    <>
      <Button
        className={classNames(
          "w-8 h-9 rounded outline-none focus:outline-none",
          "mr-1 mb-1 ease-linear transition-all duration-150"
        )}
        outline
        icon={<NextIcon name="FcPlus" className="text-xl" />}
        onClick={openModal}
      />
      {open && (
        <ModalCreateNft lastNft={lastNft} open={open} setOpen={setOpen} loadData={loadData} />
      )}
    </>
  );
};

export default NftActionCreate;
