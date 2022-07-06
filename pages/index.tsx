import type { NextPage } from "next";
import MainLayout from "../src/shared/components/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout titlePrefix="Home">
      <div className="flex items-center justify-center h-screen">
        Home View is Working
      </div>
    </MainLayout>
  );
};

export default Home;
