import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import { Nft, NftArgNames, NftArgs, UpdateNftInput } from "../../lib/modules/nft/nft.model";
import { NftService } from "../../lib/modules/nft/nft.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField from "../../components-shared/shared/formik/input-field";

const ModalUpdateNft = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: Nft;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: Nft, { setSubmitting }: FormikHelpers<Nft>) => {
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: Nft) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateNftInput = {
      name: values.name,
    };

    NftService.update({ id, data: params, token })
      .then(() => {
        loadData();
        toast.success("Modify data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
  };

  const getInitialValues = (params: Nft) => {
    const data: Nft = {
      ...convertObjectNullToEmpty(params),
    };
    return data;
  };

  const Actions = () => {
    return (
      <div className="relative flex justify-end p-4 pb-3 pt-2 bg-white z-10 border-t border-gray-3 rounded-b">
        <Button
          submit={false}
          onClick={turnOffModal}
          className="btn-large px-8 mr-2"
          large
          hoverDarken
        >
          Cancel
        </Button>

        <Button submit={true} className="btn-large px-8" primary asyncLoading>
          Save
        </Button>
      </div>
    );
  };

  return (
    <Dialog
      width="450px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={open}
      onClose={turnOffModal}
      mobileMode={false}
      title="Update nft"
    >
      <Formik
        initialValues={getInitialValues(data)}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  labelName={NftArgNames.name}
                  inputName={NftArgs.name}
                  placeholder={`Input ${NftArgNames.name}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />

                <InputField
                  labelName={NftArgNames.nickName}
                  inputName={NftArgs.nickName}
                  placeholder={`Input ${NftArgNames.nickName}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
              </div>
              <InputField
                labelName={NftArgNames.rating}
                inputName={NftArgs.rating}
                placeholder={`Input ${NftArgNames.rating}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <div className="grid grid-cols-2 gap-2">
                <InputField
                  labelName={NftArgNames.transactionHash}
                  inputName={NftArgs.transactionHash}
                  placeholder={`Input ${NftArgNames.transactionHash}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.smartContract}
                  inputName={NftArgs.smartContract}
                  placeholder={`Input ${NftArgNames.smartContract}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
              </div>
              <InputField
                labelName={NftArgNames.nftId}
                inputName={NftArgs.nftId}
                placeholder={`Input ${NftArgNames.nftId}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftArgNames.nftInfoId}
                inputName={NftArgs.nftInfoId}
                placeholder={`Input ${NftArgNames.nftInfoId}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <div className="grid grid-cols-2 gap-2">
                <InputField
                  labelName={NftArgNames.nftMintedStatus}
                  inputName={NftArgs.nftMintedStatus}
                  placeholder={`Input ${NftArgNames.nftMintedStatus}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />

                <InputField
                  labelName={NftArgNames.marketStatus}
                  inputName={NftArgs.marketStatus}
                  placeholder={`Input ${NftArgNames.marketStatus}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
              </div>

              <InputField
                labelName={NftArgNames.itemId}
                inputName={NftArgs.itemId}
                placeholder={`Input ${NftArgNames.itemId}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  labelName={NftArgNames.statElementBonus}
                  inputName={NftArgs.statElementBonus}
                  placeholder={`Input ${NftArgNames.statElementBonus}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.statExp}
                  inputName={NftArgs.statExp}
                  placeholder={`Input ${NftArgNames.statExp}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.statHPBonus}
                  inputName={NftArgs.statHPBonus}
                  placeholder={`Input ${NftArgNames.statHPBonus}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.statHp}
                  inputName={NftArgs.statHp}
                  placeholder={`Input ${NftArgNames.statHp}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.statLevel}
                  inputName={NftArgs.statLevel}
                  placeholder={`Input ${NftArgNames.statLevel}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.statLucky}
                  inputName={NftArgs.statLucky}
                  placeholder={`Input ${NftArgNames.statLucky}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.statMana}
                  inputName={NftArgs.statMana}
                  placeholder={`Input ${NftArgNames.statMana}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.statSkillBonus}
                  inputName={NftArgs.statSkillBonus}
                  placeholder={`Input ${NftArgNames.statSkillBonus}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.statStamina}
                  inputName={NftArgs.statStamina}
                  placeholder={`Input ${NftArgNames.statStamina}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  labelName={NftArgNames.statSummonCost}
                  inputName={NftArgs.statSummonCost}
                  placeholder={`Input ${NftArgNames.statSummonCost}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
              </div>
            </div>

            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateNft;

const validationSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
