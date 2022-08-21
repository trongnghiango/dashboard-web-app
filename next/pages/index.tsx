import Link from "next/link";
import { useEffect, useState } from "react";
import NextIcon, { FCIcons } from "../components-shared/next-icon";
import { NoneLayout } from "../layouts/none.layout";
import { DefaultMenuLinks } from "../lib/helpers/menu.helper";
import { SettingKeys } from "../lib/helpers/setting.helper";
import useSettings from "../hooks/use-settings";
import { useToast } from "../providers/toast-provider";
import { ApiStatus } from "../redux/redux.helper";
import { useDispatch, useSelector } from "../redux/store";
import EmailSignIn from "../components/signin/email-signin";

const SignInPage = () => {
  const [logo, setLogo] = useState(null);
  const [title, setTitle] = useState(null);

  const [userReducer] = useSelector(({ userReducer }) => [userReducer]);

  const toast = useToast();
  const dispatch = useDispatch();
  const settings = useSettings();

  useEffect(() => {
    if (settings) {
      const logoSetting = settings.find((setting) => setting.key === SettingKeys.LOGO_URL);

      const titleSetting = settings.find((setting) => setting.key === SettingKeys.TITLE);
      logoSetting && setLogo(logoSetting.value);
      titleSetting && setTitle(titleSetting.value);
    }
  }, [settings]);

  useEffect(() => {
    if (userReducer.user) {
      window.location.replace(DefaultMenuLinks.DASHBOARD);
    }
  }, [userReducer.status === ApiStatus.LOADED]);

  return (
    <div
      className="signin-1 flex items-center relative h-screen"
      style={{ background: "url(/images/atherforest.jpg) top center no-repeat", backgroundSize:"cover" }}
    >
      <div className="overlay absolute inset-0 z-0 bg-black opacity-50"></div>
      <div className="container px-4 mx-auto relative z-10 opacity-90">
        <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 mx-auto">
          <div className="bg-white p-6 md:px-12 md:pt-12 border-t-10 border-solid border-primary">
            <div className="flex items-center justify-center px-8">
              <Link href="/">
                <a className="md:block md:pb-2 text-gray-600 mr-0 inline-block whitespace-nowrap text-sm p-4 px-0 text-center bg-gray-800 rounded-md overflow-hidden mb-2">
                  {logo ? (
                    <img src={logo} className="w-52 ml-16" />
                  ) : (
                    <div className="flex justify-center">
                      <NextIcon name={FCIcons.FcSynchronize} className="text-2xl animate-spin" />
                    </div>
                  )}{" "}
                </a>
              </Link>
            </div>

            <h1 className="text-xl font-light uppercase text-primary-dark text-center mb-6">
              Sign in
            </h1>

            <div style={{ minHeight: "200px" }}>
              <EmailSignIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SignInPage.Layout = NoneLayout;
export default SignInPage;
