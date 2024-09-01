const SpeciesList = ({ list, action }) => {
  return (
    <div>
      {list.map(({ commonName, species }) => (
        <div key={species} onClick={() => action(species)}>
          {<i>{species}</i>} {`(${commonName})`}
        </div>
      ))}
    </div>
  );
};

export default SpeciesList;
