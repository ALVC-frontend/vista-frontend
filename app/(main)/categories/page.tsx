import Link from "next/link";
import Image from "next/image";

import { BreadCrumb, Button } from "@components/index";
import { statusCategories } from "@lib/dummy";
import beauty from "@assets/images/beauty.png";
import beauty1 from "@assets/images/beauty2.png";
import beauty2 from "@assets/images/beauty3.png";
import beauty3 from "@assets/images/beauty4.png";
import beauty4 from "@assets/images/beauty4.png";

export default function Page() {
  return (
    <section className="pl-3">
      <header>
        <BreadCrumb crumbs={statusCategories} />
        <div className="flex justify-between items-center px-4">
          <h2 className="font-semibold text-xl">Categories</h2>
          <Link href="/categories/new">
            <Button text="New category" primary />
          </Link>
        </div>
      </header>
      <main className="mt-3">
        <div className="flex items-center gap-x-5 bg-white py-2 rounded-sm pl-5 mb-[1px]">
          <Image src={beauty} alt="beauty" />
          <p className="text-primary">Beauty</p>
        </div>
        <div className="flex items-center gap-x-5 bg-white py-2 rounded-sm pl-5 mb-[1px]">
          <Image src={beauty1} alt="beauty1" />
          <p className="text-primary">Beauty/bbb</p>
        </div>
        <div className="flex items-center gap-x-5 bg-white py-2 rounded-sm pl-5 mb-[1px]">
          <Image src={beauty2} alt="beauty2" />
          <p className="text-primary">Clothes</p>
        </div>
        <div className="flex items-center gap-x-5 bg-white py-2 rounded-sm pl-5 mb-[1px]">
          <Image src={beauty3} alt="beauty3" />
          <p className="text-primary">Shoes</p>
        </div>
        <div className="flex items-center gap-x-5 bg-white py-2 rounded-sm pl-5 mb-[1px]">
          <Image src={beauty4} alt="beauty4" />
          <p className="text-primary">T-shirts</p>
        </div>
      </main>
    </section>
  );
}
