import styles from './my-phone-list.module.css';

const MyPhoneList = ({ items, deleteContact, changeFilter }) => {
  const elements = items.map(({ id, name, number }) => (
    <li key={id} className={styles.contacts}>
      {name}: {number}{' '}
      <button onClick={() => deleteContact(id)} type="button">
        Delete
      </button>
    </li>
  ));
  return (
    <>
      <h2>Contacts</h2>
      <div className={styles.filter}>
        <label htmlFor="filterID">Find contacts by name</label>
        <input
          onChange={changeFilter}
          id="filterID"
          name="filter"
          placeholder="Search"
        />
      </div>
      <ul className={styles.list}>{elements}</ul>
    </>
  );
};

export default MyPhoneList;
