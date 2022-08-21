import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";

import { getUserToken } from "../../lib/modules/user/user.model";
import { useDispatch, useSelector } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import {
  NftInfo,
  NftInfoArgNames,
  NftInfoArgs,
  UpdateNftInfoInput,
} from "../../lib/modules/nft-info/nft-info.model";
import { NftInfoService } from "../../lib/modules/nft-info/nft-info.repo";
import { convertObjectNullToEmpty } from "../../lib/helpers/common.helper";
import { BaseModelArgNames, BaseModelArgs } from "../../lib/models/base-model.model";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import InputField from "../../components-shared/shared/formik/input-field";
import TextAreaField from "../../components-shared/shared/formik/text-area-field";
import DateField from "../../components-shared/shared/formik/date-field";

const ModalUpdateNftInfo = ({
  data,
  open,
  setOpen,
  loadData,
}: {
  data: NftInfo;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData?: () => void;
}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: NftInfo, { setSubmitting }: FormikHelpers<NftInfo>) => {
    updateData(values);
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const updateData = (values: NftInfo) => {
    // console.log("---------params", params);
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    const id = data.id;

    const params: UpdateNftInfoInput = {
      name: values.name,
    };

    NftInfoService.update({ id, data: params, token })
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

  const getInitialValues = (params: NftInfo) => {
    const data: NftInfo = {
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
      title="Update nftInfo"
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
                labelName={NftInfoArgNames.name}
                inputName={NftInfoArgs.name}
                placeholder={`Input ${NftInfoArgNames.name}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <TextAreaField
                labelName={NftInfoArgNames.description}
                inputName={NftInfoArgs.description}
                placeholder={`Input ${NftInfoArgNames.description}`}
                value={values.description}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <TextAreaField
                labelName={NftInfoArgNames.funfact}
                inputName={NftInfoArgs.funfact}
                placeholder={`Input ${NftInfoArgNames.funfact}`}
                value={values.funfact}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <DateField
                labelName={NftInfoArgNames.birthDay}
                inputName={NftInfoArgs.birthDay}
                placeholder={`Input ${NftInfoArgNames.birthDay}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftInfoArgNames.gender}
                inputName={NftInfoArgs.gender}
                placeholder={`Input ${NftInfoArgNames.gender}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftInfoArgNames.mediaUrl}
                inputName={NftInfoArgs.mediaUrl}
                placeholder={`Input ${NftInfoArgNames.mediaUrl}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftInfoArgNames.bodyAura}
                inputName={NftInfoArgs.bodyAura}
                placeholder={`Input ${NftInfoArgNames.bodyAura}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftInfoArgNames.bodyClaws}
                inputName={NftInfoArgs.bodyClaws}
                placeholder={`Input ${NftInfoArgNames.bodyClaws}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />

              <InputField
                labelName={NftInfoArgNames.bodyEars}
                inputName={NftInfoArgs.bodyEars}
                placeholder={`Input ${NftInfoArgNames.bodyEars}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftInfoArgNames.bodyEyes}
                inputName={NftInfoArgs.bodyEyes}
                placeholder={`Input ${NftInfoArgNames.bodyEyes}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftInfoArgNames.bodySkintone}
                inputName={NftInfoArgs.bodySkintone}
                placeholder={`Input ${NftInfoArgNames.bodySkintone}`}
                // haveErrors={errors.name && touched.name}
                // error={errors.name}
              />
              <InputField
                labelName={NftInfoArgNames.bodyTatoo}
                inputName={NftInfoArgs.bodyTatoo}
                placeholder={`Input ${NftInfoArgNames.bodyTatoo}`}
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

export default ModalUpdateNftInfo;

const validationSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
