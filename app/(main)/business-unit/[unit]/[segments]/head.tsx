import { convertFirstCapitals } from "@lib/helpers";

export default function Head({ params }: any) {
  const title = convertFirstCapitals(params.unit.split("-"));

  return (
    <>
      <title>{title.join(" ")}</title>
    </>
  );
}
