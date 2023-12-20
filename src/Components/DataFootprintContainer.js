import styles from "./DataFootprintContainer.module.css";

const DataFootprintContainer = ({
  dataImageUrl,
  featureDescription,
  registrationProcessDescri,
}) => {
  return (
    <div className={styles.cardInner}>
      <div className={styles.iconsParent}>
        <img className={styles.icons} alt="" src={dataImageUrl} />
        <div className={styles.dataFootprint}>{featureDescription}</div>
        <div className={styles.eliminatingTheRegistration}>
          {registrationProcessDescri}
        </div>
      </div>
    </div>
  );
};

export default DataFootprintContainer;
