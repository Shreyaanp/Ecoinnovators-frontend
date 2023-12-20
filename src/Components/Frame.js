import DataFootprintContainer from "../Components/DataFootprintContainer";
import styles from "./Frame.module.css";
import { Link } from "react-router-dom";


const Frame = () => {
  return (
    <div className={styles.div}>
      <div className={styles.hero}>
        <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
        <img className={styles.shapeIcon} alt="" src="/shape@2x.png" />
        <div className={styles.text}>
          <div className={styles.noRegistrationRequiredContainer}>
            <p className={styles.noRegistrationRequired}>
              No Registration Required
            </p>
          </div>
          <div className={styles.userAnonymityWe}>
            User Anonymity: We understand the importance of privacy. That's why
            we've designed our platform to be accessed without the need for
            registration. This ensures that users can benefit from our services
            while remaining anonymous.
          </div>
          <div className={styles.primaryButton}>
          <Link to="dashboard" className='white'><div className={styles.guestLogin}>Guest Login</div></Link>
          </div>
        </div>
        <img
          className={styles.fontCircleIcon}
          alt=""
          src="/font-circle@2x.png"
        />
      </div>
      <div className={styles.card}>
        <DataFootprintContainer
          dataImageUrl="/icons@2x.png"
          featureDescription="Data Footprint"
          registrationProcessDescri="eliminating the registration process, we also reduce the amount of personal data intake."
        />
        <DataFootprintContainer
          dataImageUrl="/icons1@2x.png"
          featureDescription="Convenience"
          registrationProcessDescri="we offer the option to log in using third-party accounts. This method streamlines the login process"
        />
        <DataFootprintContainer
          dataImageUrl="/icons2@2x.png"
          featureDescription="Transparency"
          registrationProcessDescri=" We believe in being transparent about our practices. The utmost respect for their privacy."
        />
      </div>
    </div>
  );
};

export default Frame;
