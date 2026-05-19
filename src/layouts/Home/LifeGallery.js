import lifeHobbies from 'assets/home/Lifehobbies.png';
import styles from './LifeGallery.module.css';

export function LifeGallery({ id, sectionRef }) {
  return (
    <section className={styles.lifeGallery} id={id} ref={sectionRef}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          What my life looks like, outside design
        </h2>

        <img
          src={lifeHobbies?.src || lifeHobbies}
          alt="Life outside design — hobbies and interests"
          className={styles.galleryImage}
        />
      </div>
    </section>
  );
}
