// import PageLogo from "../components/page-logo";
import usePage from "../hooks/use-page";
import { PageData } from "../lib/models/page-data.model";

const LiteLayout = ({
  title = "Athersphere - Lotto game and entertainment",
  ...props
}: {
  title?: string;
  children?: any;
}) => {
  const pageData = usePage();
  console.log({pageData});

  return (
    <>
      <Header pageData={pageData} />

      <main>
        {props.children}
      </main>
    </>
  );
};
export default LiteLayout;

const Header = ({ pageData }: { pageData: PageData }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8 flex items-center gap-3">
        <div className="bg-yellow-600 w-100 h-100 p-2 rounded-full">
          {/* <PageLogo className="w-5 text-white" code={pageData.code} /> */}
          
        </div>
        <h1 className="text-xl uppercase font-light leading-none text-gray-900">
          {pageData ? pageData.title : 'Ciquan'}
        </h1>
      </div>
    </header>
  );
};
