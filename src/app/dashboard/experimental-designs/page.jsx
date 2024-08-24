import Link from "next/link";

const ExperimentalDesignsPage = () => {
  return (
    <>
      <div>Experimental designs page</div>
      <Link href="/dashboard/experimental-designs/1">
        Diseño experimental 1
      </Link>
    </>
  );
};

export default ExperimentalDesignsPage;
