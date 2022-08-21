import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField from // InputType,
"../../components-shared/shared/formik/input-field";
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import { getUserToken } from "../../lib/modules/user/user.model";

import {
  NftRarityArgNames,
  NftRarityArgs,
  NftRarityInitialValues,
  CreateNftRarityInput,
} from "../../lib/modules/nft-rarity/nft-rarity.model";
import { NftRarityService } from "../../lib/modules/nft-rarity/nft-rarity.repo";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import TextAreaField from "../../components-shared/shared/formik/text-area-field";

const ModalCreateNftRarity = ({
  open,
  setOpen,
  loadData,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (
    values: CreateNftRarityInput,
    { setSubmitting }: FormikHelpers<CreateNftRarityInput>
  ) => {
    createData({ ...values });
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const createData = (data: CreateNftRarityInput) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    NftRarityService.create({ data, token })
      .then(() => {
        loadData();
        toast.success("Create data successfully.");
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
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
      title="Create new nftRarity"
    >
      <Formik
        initialValues={NftRarityInitialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={NftRarityArgNames.name}
                inputName={NftRarityArgs.name}
                placeholder={`Input ${NftRarityArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <TextAreaField
                labelName={NftRarityArgNames.description}
                inputName={NftRarityArgs.description}
                placeholder={`Input ${NftRarityArgNames.description}`}
                value={values.description}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftRarityArgNames.image}
                inputName={NftRarityArgs.image}
                placeholder={`Input ${NftRarityArgNames.image}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftRarityArgNames.color}
                inputName={NftRarityArgs.color}
                placeholder={`Input ${NftRarityArgNames.color}`}
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

export default ModalCreateNftRarity;

const validationSchema = Yup.object().shape({
  // name: Yup.string()
  //   .min(2, "Too Short!")
  //   .max(50, "Too Long!")
  //   .required("Required"),
});
