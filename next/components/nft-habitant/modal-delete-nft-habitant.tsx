import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "../../redux/store";
import { useToast } from "../../providers/toast-provider";
import { setLoading } from "../../redux/actions/loading.action";
import {
  AlertDialog,
  AlertTypes,
} from "../../components-shared/shared/utilities/dialog/alert-dialog";
import { NftHabitant } from "../../lib/modules/nft-habitant/nft-habitant.model";
import { NftHabitantService } from "../../lib/modules/nft-habitant/nft-habitant.repo";
import { getUserToken } from "../../lib/modules/user/user.model";

const ModalDeleteNftHabitant = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: NftHabitant;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const confirmDelete = () => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;
    NftHabitantService.delete({ id, token })
      .then(() => {
        loadData();
        toast.success("Modify data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
    closeModal();
  };

  const closeModal = () => {
    setOpen(!open);
  };

  return (
    <AlertDialog
      isOpen={open}
      type={AlertTypes.question}
      onConfirm={confirmDelete}
      onClose={closeModal}
      title="Delete nftHabitant"
      content="Are you sure you want to delete this data ?"
    />
  );
};

export default ModalDeleteNftHabitant;
