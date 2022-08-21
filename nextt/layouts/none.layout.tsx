
export function NoneLayout({
  title = "Akapro",
  ...props
}: {
  title?: string;
  children?: any;
}) {
  return (
    <>
      <div className="w-full min-h-screen">{props.children}</div>
    </>
  );
}
