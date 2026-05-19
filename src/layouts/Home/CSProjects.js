import styles from './CSProjects.module.css';

export function CSProjects({ id }) {
  return (
    <section className={styles.csProjects} id={id}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.heading}>My computer science degree put to work</h2>
          <p className={styles.subtitle}>Seemingly for the benefit of designers</p>
        </div>

        <div className={styles.body}>
          <div className={styles.projectCard}>
            <div className={styles.iconWrapper}>
              <svg
                className={styles.flowerIcon}
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="100"
                    cy="50"
                    rx="18"
                    ry="50"
                    fill="#1a1a1a"
                    transform={`rotate(${i * 36} 100 100)`}
                  />
                ))}
              </svg>
            </div>

            <div className={styles.cardText}>
              <p className={styles.cardLabel}>ML model - Vision</p>
              <div className={styles.cardTitleDescGroup}>
                <h3 className={styles.cardTitle}>Visual hierarchy predictor</h3>
                <p className={styles.cardDescription}>
                  Predicts attention distribution in UI layouts
                </p>
              </div>
            </div>
          </div>

          <p className={styles.footer}>+ Numerous vibe code projects</p>
        </div>
      </div>
    </section>
  );
}
