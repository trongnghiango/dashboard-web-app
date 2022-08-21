import { useRouter } from "next/router";
import { PageData } from "../lib/models/page-data.model";
import { pagesData } from "../shared/pages-data";

const usePage = (): PageData => {

    const router = useRouter();

    let pageData: PageData = {
        code: "",
        title: "Athersphere",
        description:
            "",
        url: "https://dashboard.ather.finance",
        image: "https://dashboard.ather.finance/images/Athersphere.png",
    };

    if (router.query.slug) {
        pageData = pagesData.find(({ code }) => code === router.query.slug)?? pageData;
    } else {
        pageData = pagesData.find(({ url }) => url === router.pathname)?? pageData;
    }

    return pageData;
};


export default usePage;


    // const origin =
    //   typeof window !== "undefined" && window.location.origin
    //     ? window.location.origin
    //     : "";
    // console.log('origin',origin);