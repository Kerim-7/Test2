import styles from './Skeleton.module.css';

const Skeleton = ({ type = 'card', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={styles.skeletonCard}>
            <div className={styles.skeletonHeader}>
              <div className={styles.skeletonAvatar}></div>
              <div className={styles.skeletonUserInfo}>
                <div className={styles.skeletonUserName}></div>
                <div className={styles.skeletonUserUsername}></div>
              </div>
              <div className={styles.skeletonActions}>
                <div className={styles.skeletonButton}></div>
                <div className={styles.skeletonMenu}></div>
              </div>
            </div>
            <div className={styles.skeletonContent}>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonTimestamp}></div>
            </div>
          </div>
        );
      case 'tab':
        return (
          <div className={styles.skeletonTab}></div>
        );
      default:
        return <div className={styles.skeletonDefault}></div>;
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className={styles.skeletonContainer}>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className={styles.skeletonItem}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
