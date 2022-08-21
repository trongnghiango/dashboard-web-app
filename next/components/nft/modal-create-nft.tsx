import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "../../components-shared/shared/utilities/form/button";
import * as Yup from "yup";
import InputField, { InputType } from "../../components-shared/shared/formik/input-field"; // InputType,
import { useDispatch } from "../../redux/store";
import { setLoading } from "../../redux/actions/loading.action";
import { getUserToken } from "../../lib/modules/user/user.model";

import { NftArgNames, NftArgs, CreateNftInput, Nft } from "../../lib/modules/nft/nft.model";
import { NftService } from "../../lib/modules/nft/nft.repo";

import { useToast } from "../../providers/toast-provider";
import { Dialog } from "../../components-shared/shared/utilities/dialog/dialog";
import { NftAirdrop } from "../../lib/modules/nft-airdrop/nft-airdrop.model";
import useWeb3, { ChainNetworks } from "../../hooks/use-web3";
import { NftAirdropService } from "../../lib/modules/nft-airdrop/nft-airdrop.repo";
import { classNames } from "../../lib/helpers/design";
import { NftInfoService } from "../../lib/modules/nft-info/nft-info.repo";
import { NftInfo } from "../../lib/modules/nft-info/nft-info.model";
import useWallet from "../../hooks/use-wallet";
import useContract from "../../hooks/use-contract";
import { SMTransaction } from "../../lib/models/blockchain.model";

const ModalCreateNft = ({
  open,
  setOpen,
  loadData,
  lastNft,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  loadData: () => void;
  lastNft: Nft;
}) => {
  const { checkPolygonNetwork, changeNetwork } = useWeb3();
  const { currentAccount } = useWallet();
  const { createNFT } = useContract();

  const [airdropData, setAirdropData] = useState<NftAirdrop[]>();
  const [nftInfoData, setNftInfoData] = useState<NftInfo[]>();
  const [selectedAirdrop, selectAirdop] = useState<NftAirdrop>();

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    loadAirdrops();
    loadNftInfos();
    // check mang - neu ko dung polygon thi hien popup
    if (!checkPolygonNetwork()) {
      setLoading(true)(dispatch);
      changeNetwork({ networkName: ChainNetworks.polygonTestnet })
        .then((data) => {
          setLoading(false)(dispatch);
        })
        .catch((error) => {});
    }
  }, []);

  const nftInitialValues: CreateNftInput = {
    name: "",
    nftId: lastNft?.nftId + 1,

    transactionHash: "",
    smartContract: "",
    address: currentAccount,

    nickName: "",
    customerId: "",
    statExp: 0,
    statLevel: 0,
    statSkillBonus: 0,
    statHPBonus: 0,
    statElementBonus: 0,
    statHp: 0,
    statMana: 0,
    statStamina: 0,
    statLucky: 0,
    statSummonCost: 0,
    rating: 0,
    nftInfoId: "",
    itemId: "",
    logs: "",
  };

  useEffect(() => {
    if (airdropData) {
      selectAirdop(airdropData[0]);
    }
  }, [airdropData]);

  const loadAirdrops = () => {
    setLoading(true)(dispatch);
    NftAirdropService.getAll({})
      .then((data) => {
        setAirdropData(data.data);
        setLoading(false)(dispatch);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
      });
  };

  const loadNftInfos = () => {
    setLoading(true)(dispatch);
    NftInfoService.getAll({})
      .then((data) => {
        setNftInfoData(data.data);
        setLoading(false)(dispatch);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
      });
  };

  const turnOffModal = () => {
    setOpen(!open);
  };

  const submit = (values: CreateNftInput, { setSubmitting }: FormikHelpers<CreateNftInput>) => {
    createData({ ...values });
    // alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
    turnOffModal();
  };

  const createData = (data: CreateNftInput) => {
    setLoading(true)(dispatch);
    const token = getUserToken(false);
    data.nftAirdropId = selectedAirdrop.id;
    NftService.create({ data, token })
      .then((data: Nft) => {
        // loadData();
        // toast.success("Create data successfully.");
        createNFT(currentAccount, selectedAirdrop?.price, data?.nftId)
          .then((res: SMTransaction) => {
            console.log("createNFT data", data);

            NftService.update({
              id: data.id,
              data: {
                transactionHash: res.transactionHash,
                smartContract: res.contractAddress,
                address: data.address,
              },
              token,
            });

            setLoading(false)(dispatch);
            toast.success("Buy NFT successfully.");
            loadData();
          })
          .catch((error) => {
            console.log("error", error);
            setLoading(false)(dispatch);
            loadData();
            toast.error("Buy NFT unsuccessfully.");
            NftService.rejectDropNft({
              token,
            })
              .then()
              .catch((error) => {
                console.log("error", error);
              });
          });
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false)(dispatch);
        toast.error("System error. Modify data unsuccessfully.");
      });
  };

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const getRandNFTInfo = () => nftInfoData[random(0, nftInfoData.length - 1)];

  const randomNftStat = (values, setValues) => {
    const nftInfo = getRandNFTInfo();

    const nft: Nft = {
      name: nftInfo.name,
      nftId: values.nftId,
      nickName: values.nickName,
      nftInfoId: nftInfo.id,
      address: currentAccount,
      statElementBonus: random(
        selectedAirdrop.seedElementBonus[0],
        selectedAirdrop.seedElementBonus[1]
      ),
      statExp: random(selectedAirdrop.seedExp[0], selectedAirdrop.seedExp[1]),
      statHPBonus: random(selectedAirdrop.seedHPBonus[0], selectedAirdrop.seedHPBonus[1]),
      statHp: random(selectedAirdrop.seedHPBonus[0], selectedAirdrop.seedHPBonus[1]),
      statLevel: random(selectedAirdrop.seedLevel[0], selectedAirdrop.seedLevel[1]),
      statSkillBonus: random(selectedAirdrop.seedSkillBonus[0], selectedAirdrop.seedSkillBonus[1]),
      statMana: random(selectedAirdrop.seedMana[0], selectedAirdrop.seedMana[1]),
      statStamina: random(selectedAirdrop.seedStamina[0], selectedAirdrop.seedStamina[1]),
      statLucky: random(selectedAirdrop.seedLucky[0], selectedAirdrop.seedLucky[1]),
      statSummonCost: random(selectedAirdrop.seedSummonCost[0], selectedAirdrop.seedSummonCost[1]),
    };
    setValues(nft);
  };

  const Actions = ({ setValues, values }) => {
    return (
      <div className="relative flex gap-2 justify-end p-4 pb-3 pt-2 bg-white z-10 border-t border-gray-3 rounded-b">
        <Button
          submit={false}
          onClick={turnOffModal}
          className="btn-large px-8 mr-2"
          large
          hoverDarken
        >
          Cancel
        </Button>
        <Button className="btn-large px-8" warning onClick={() => randomNftStat(values, setValues)}>
          Random stat
        </Button>
        <Button submit={true} className="btn-large px-8" primary asyncLoading>
          Mint
        </Button>
      </div>
    );
  };

  return (
    <Dialog
      width="750px"
      dialogClass="relative bg-white shadow-md rounded m-auto"
      isOpen={open}
      onClose={turnOffModal}
      mobileMode={false}
      title="Create new nft"
    >
      <Formik
        initialValues={nftInitialValues}
        validationSchema={validationSchema}
        onSubmit={submit}
      >
        {({ errors, touched, values, setValues, setFieldValue }) => (
          <Form>
            <div className="p-5 grid grid-cols-3 gap-2">
              <div className="col-span-3">Select Airdrop</div>
              {airdropData?.map((airdrop, i) => {
                return (
                  <div
                    onClick={() => {
                      selectAirdop(airdrop);
                      setFieldValue("", airdrop.id);
                    }}
                    key={i}
                    className={classNames(
                      "px-2 text-white rounded-full text-center cursor-pointer",
                      selectedAirdrop?.id === airdrop?.id ? "bg-primary-dark" : "bg-primary "
                    )}
                  >
                    {airdrop.price} MATIC
                  </div>
                );
              })}
            </div>
            <div className="p-3 grid grid-cols-2 gap-2">
              <div>
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
                  wrapperClass="pt-2"
                  labelName={NftArgNames.rating}
                  inputName={NftArgs.rating}
                  placeholder={`Input ${NftArgNames.rating}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />

                <InputField
                  wrapperClass="pt-2"
                  labelName={NftArgNames.nftId}
                  inputName={NftArgs.nftId}
                  inputType={InputType.number}
                  placeholder={`Input ${NftArgNames.nftId}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />

                <InputField
                  wrapperClass="pt-2"
                  labelName={NftArgNames.nftInfoId}
                  inputName={NftArgs.nftInfoId}
                  placeholder={`Input ${NftArgNames.nftInfoId}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
                <InputField
                  wrapperClass="pt-2"
                  labelName={NftArgNames.itemId}
                  inputName={NftArgs.itemId}
                  placeholder={`Input ${NftArgNames.itemId}`}
                  // haveErrors={errors.name && touched.name}
                  // error={errors.name}
                />
              </div>

              <div>
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
            </div>
            <Actions setValues={setValues} values={values} />
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ModalCreateNft;

const validationSchema = Yup.object().shape({
  // name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});
