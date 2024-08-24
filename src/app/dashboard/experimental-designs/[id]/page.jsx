import { Suspense } from "react";
import styles from "./styles.module.css";
import UserInformation from "@/components/userInformation/page";

// DATA FETCHING FROM AN API

const getSingleExperimentalDesign = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store", // Does not allow to store data on cache
    // next:{revalidate: 3600} // It revalidates data every hour
  });

  if (!res.ok) throw new Error("Not found!");

  return res.json();
};

const SingleExperimentalDesignPage = async ({ params, searchParams }) => {
  const { id, userId, title, body } = await getSingleExperimentalDesign(
    params.id
  );

  return (
    <>
      <div>Single experimental design page</div>
      <div className={styles.container}>
        <Suspense fallback={<div>Please wait...</div>}>
          <UserInformation id={userId} />
        </Suspense>
        <div>
          <div className={styles.header}>{title}</div>
          <div className={styles.body}>
            <div>ID: {id}</div>
            <div>Description: {body}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleExperimentalDesignPage;
