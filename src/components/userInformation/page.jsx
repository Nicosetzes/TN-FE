import styles from "./styles.module.css";

// DATA FETCHING FROM AN API

const getUserData = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "no-store", // Does not allow to store data on cache
    // next:{revalidate: 3600} // It revalidates data every hour
  });

  if (!res.ok) throw new Error("Not found!");

  return res.json();
};

const UserInformation = async ({ id }) => {
  const { name, username, email } = await getUserData(id);

  return (
    <div className={styles.container}>
      <div>Name: {name}</div>
      <div>Username: {username}</div>
      <div>Email: {email}</div>
    </div>
  );
};

export default UserInformation;
