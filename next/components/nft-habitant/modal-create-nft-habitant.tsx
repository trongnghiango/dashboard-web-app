import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField from "../../components-shared/shared/formik/input-field"; // InputType,
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import { getUserToken } from "../../lib/modules/user/user.model";

import {
  NftHabitantArgNames,
  NftHabitantArgs,
  NftHabitantInitialValues,
  CreateNftHabitantInput,
} from "../../lib/modules/nft-habitant/nft-habitant.model";
import { NftHabitantService } from "../../lib/modules/nft-habitant/nft-habitant.repo";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import TextAreaField from "../../components-shared/shared/formik/text-area-field";

const ModalCreateNftHabitant = ({
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
    values: CreateNftHabitantInput,
    { setSubmitting }: FormikHelpers<CreateNftHabitantInput>
  ) => {
    createData({ ...values });
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const createData = (data: CreateNftHabitantInput) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    NftHabitantService.create({ data, token })
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
      title="Create new nftHabitant"
    >
      <Formik
        initialValues={NftHabitantInitialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values }) => (
          <Form>
            <div className="p-3">
              <InputField
                labelName={NftHabitantArgNames.name}
                inputName={NftHabitantArgs.name}
                placeholder={`Input ${NftHabitantArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <TextAreaField
                labelName={NftHabitantArgNames.description}
                inputName={NftHabitantArgs.description}
                placeholder={`Input ${NftHabitantArgNames.description}`}
                value={values.description}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftHabitantArgNames.image}
                inputName={NftHabitantArgs.image}
                placeholder={`Input ${NftHabitantArgNames.image}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftHabitantArgNames.color}
                inputName={NftHabitantArgs.color}
                placeholder={`Input ${NftHabitantArgNames.color}`}
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

export default ModalCreateNftHabitant;

const validationSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
