import styles from "./Footer.module.css";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // This provides a smooth scrolling effect
  });

}

const Footer = () => {

  


  return (
    <section className={styles.footer} id="footer">
      <img className={styles.image3Icon} alt="" src="/image-3@2x.png" />
      <b className={styles.walkThroughTheContainer}>
        <span className={styles.walkThroughTheContainer1}>
          <span>{`Walk through the `}</span>
          <span className={styles.world}>world</span>
          <span> with us</span>
        </span>
      </b>
      <div className={styles.delveIntoOurContainer}>
        <span className={styles.walkThroughTheContainer1}>
          <p className={styles.delveIntoOur}>
            "Delve into Our Cutting-Edge Research"
          </p>
          <p className={styles.delveIntoOur}>
            Revolutionizing Productivity and Innovation
          </p>
          <p className={styles.delveIntoOur}>
            "Discover How Our AI Solutions Redefine Boundaries"
          </p>
          <p className={styles.delveIntoOur}>
            Shaping Tomorrow's Tech Landscape
          </p>
          <p className={styles.delveIntoOur}>
            "Explore Opportunities to Make an Impact
          </p>
        </span>
      </div>
      <div className={styles.primaryButton} />
      <div className={styles.swipeUp} onClick={scrollToTop}>{`swipe up `}</div>
    </section>
  );
};

export default Footer;
