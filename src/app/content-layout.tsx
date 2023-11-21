// default content wrapper to set up width and padding
export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"mx-auto flex w-full max-w-5xl pt-10  px-2 "}>
      <div className={"w-full"}>{children}</div>
    </div>
  );
}
