import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  NftAirdrop,
  NftAirdropArgNames,
  NftAirdropArgs,
  UpdateNftAirdropInput,
} from "../../lib/modules/nft-airdrop/nft-airdrop.model";
import { NftAirdropService } from "../../lib/modules/nft-airdrop/nft-airdrop.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField, { InputType } from "../../components-shared/shared/formik/input-field";

const ModalUpdateNftAirdrop = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: NftAirdrop;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: NftAirdrop, { setSubmitting }: FormikHelpers<NftAirdrop>) => {
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: NftAirdrop) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateNftAirdropInput = {
      name: values.name,
    };

    NftAirdropService.update({ id, data: params, token })
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

  const getInitialValues = (params: NftAirdrop) => {
    const data: NftAirdrop = {
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
      title="Update nftAirdrop"
    >
      <Formik
        initialValues={getInitialValues(data)}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={NftAirdropArgNames.name}
                inputName={NftAirdropArgs.name}
                placeholder={`Input ${NftAirdropArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftAirdropArgNames.price}
                inputName={NftAirdropArgs.price}
                placeholder={`Input ${NftAirdropArgNames.price}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftAirdropArgNames.seedElementBonus}
                inputName={NftAirdropArgs.seedElementBonus}
                placeholder={`Input ${NftAirdropArgNames.seedElementBonus}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftAirdropArgNames.seedExp}
                inputName={NftAirdropArgs.seedExp}
                placeholder={`Input ${NftAirdropArgNames.seedExp}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftAirdropArgNames.seedHPBonus}
                inputName={NftAirdropArgs.seedHPBonus}
                placeholder={`Input ${NftAirdropArgNames.seedHPBonus}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftAirdropArgNames.seedLevel}
                inputName={NftAirdropArgs.seedLevel}
                placeholder={`Input ${NftAirdropArgNames.seedLevel}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftAirdropArgNames.seedSkillBonus}
                inputName={NftAirdropArgs.seedSkillBonus}
                placeholder={`Input ${NftAirdropArgNames.seedSkillBonus}`}
                inputType={InputType.number}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
            </div>

            <Actions />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalUpdateNftAirdrop;

const validationSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
