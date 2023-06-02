"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { BreadCrumb, Button } from '@components/index';
import { BreadLink } from 'types/crumbs';
import { useSearchParams } from 'next/navigation';

interface Unit {
  id: number;
  name: string;
  // add any other properties here as needed
}

interface Params {
  name: string;
}
export default function Page({ params }: any) {

  const searchParams = useSearchParams();
  const organisation_id = searchParams?.get('organisation_id');
  const [businessUnits, setBusinessUnits] = useState<Unit[]>([]);


  const links: BreadLink[] = [
    {
      link: '/organisations',
      textToDisplay: 'Organisations',
    },
    {
      link: `/organisations/${params.name}`,
      textToDisplay: `${params.name}`,
    },
    {
      link: `/organisations/${params.name}/business-unit`,
      textToDisplay: 'Business units',
    },
  ];

  useEffect(() => {
    const fetchBusinessUnits = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/admin/organisations/${organisation_id}/business_units`
        );
        setBusinessUnits(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching business units:', error);
      }
    };

    fetchBusinessUnits();
  }, []);

  return (
    <section className="w-full pl-1">
      {/* Header  */}
      <BreadCrumb crumbs={links} />
      <header className="flex items-center justify-between px-3 my-4">
        <div className="hidden md:block">
          <h3 className="font-semibold">Business Units</h3>
        </div>

        <div className="">
          <Link href="/business-unit/add">
            <Button
              text="New business unit"
              primary
              extraStyles="font-thin text-sm px-4 py-3"
            />
          </Link>
        </div>
      </header>

      {/* business units table  */}

      <article className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="pl-3">
              <td>Name</td>
            </tr>
          </thead>


        </table>
      </article>
    </section>
  );
}
