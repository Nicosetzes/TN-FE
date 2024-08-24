import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <div>Page has not been found</div>
      <Link href="/">Back to home</Link>
    </>
  );
};

export default NotFound;
