import styles from "./ExplorationBeyondLimitsCardCon.module.css";

const ExplorationBeyondLimitsCardCon = () => {
  return (
    <div className={styles.card}>
      <div className={styles.iconsParent}>
        <img className={styles.icons} alt="" src="/icons3@2x.png" />
        <b className={styles.explorationBeyondLimitsContainer}>
          <p className={styles.explorationBeyond}>{`Exploration Beyond `}</p>
          <p className={styles.explorationBeyond}>{`Limits: `}</p>
        </b>
        <div className={styles.ourUnwaveringCommitment}>
          Our unwavering commitment to research leads us to explore.
        </div>
      </div>
      <div className={styles.iconsParent}>
        <img className={styles.icons} alt="" src="/icons3@2x.png" />
        <b
          className={styles.explorationBeyondLimitsContainer}
        >{`Pioneering Innovation: `}</b>
        <div className={styles.ourUnwaveringCommitment}>
          <p className={styles.explorationBeyond}>
            We are dedicated to pushing technological boundaries through
            advanced research.
          </p>
        </div>
      </div>
      <div className={styles.iconsContainer}>
        <img className={styles.icons} alt="" src="/icons3@2x.png" />
        <b className={styles.explorationBeyondLimitsContainer}>
          Strategic Actionability:
        </b>
        <div className={styles.ourUnwaveringCommitment}>
          Insights derived from our research are not merely academic; they are
          translated into knowledge.
        </div>
      </div>
      <div className={styles.frameDiv}>
        <img className={styles.icons} alt="" src="/icons3@2x.png" />
        <div className={styles.joinUsOn}>
          Join us on this distinguished journey of exploration, where insights
          and innovation converge to forge the intelligence of the future.
        </div>
      </div>
    </div>
  );
};

export default ExplorationBeyondLimitsCardCon;
