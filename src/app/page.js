import AllProducts from "@/components/AllProducts";
import HeaderSlider from "@/components/HeaderSlider";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <HeaderSlider />
      <AllProducts />
    </>
  );
}
