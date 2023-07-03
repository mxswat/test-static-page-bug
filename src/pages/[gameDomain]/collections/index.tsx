import { NextPage, GetServerSideProps } from "next";

const Page: NextPage = () => (
  <main>
    WoW a page
  </main>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      showAds: false,
    },
  };
};

export default Page;
