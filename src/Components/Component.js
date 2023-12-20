import ExplorationBeyondLimitsCardCon from "./ExplorationBeyondLimitsCardCon";
import styles from "./Component.module.css";

const ThirdComponent = () => {
  return (
    <section className={styles.section} id="gridthird">
      <div className={styles.image}>
        <img className={styles.image2Icon} alt="" src="/image-2@2x.png" />
        <div className={styles.number}>
          <b className={styles.b}>256B+</b>
          <div className={styles.moreDataAs}>more data as ever.</div>
        </div>
      </div>
      <div className={styles.child} />
      <div className={styles.content}>
        <div className={styles.unveilingInsightsForging}>
          Unveiling Insights, Forging Tomorrow
        </div>
        <div className={styles.weAreAtContainer}>
          <p className={styles.weAreAt}>
            We are at the forefront of pioneering research. Our journey begins
            with web scraping, where we collect valuable data from diverse
            sources.
          </p>
        </div>
        <div className={styles.primaryButton}>
          <div className={styles.exploreNow}>Explore Now</div>
        </div>
      </div>
      <div className={styles.footerFrame} />
      <ExplorationBeyondLimitsCardCon />
    </section>
  );
};

export default ThirdComponent;
