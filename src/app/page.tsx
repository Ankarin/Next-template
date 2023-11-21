import Welcome from "@/components/home/Welcome";
import ContentLayout from "@/app/content-layout";

export default function Home() {
  return (
    <main className="flex flex-col items-center ">
      <ContentLayout>
        <Welcome></Welcome>
      </ContentLayout>
    </main>
  );
}
