import { type NextPage } from "next";
import Table from "~/components/Table";

const Home: NextPage = () => {
  return (
    <>
      <Table
        data={[
          {
            id: 1,
            productName: "Product 1",
            color: "Red",
            category: "Category 1",
            price: "100",
          },
          {
            id: 2,
            productName: "Product 2",
            color: "Blue",
            category: "Category 31",
            price: "500",
          },
        ]}
      />
    </>
  );
};

export default Home;
