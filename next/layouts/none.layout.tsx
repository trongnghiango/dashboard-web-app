import { HeadSEO } from "./default-layout/components/head-seo";

export function NoneLayout({
  title = "Athersphere",
  ...props
}: {
  title?: string;
  children?: any;
}) {
  return (
    <>
      <HeadSEO />
      <div className="w-full min-h-screen">{props.children}</div>
    </>
  );
}
