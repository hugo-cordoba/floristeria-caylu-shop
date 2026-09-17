import Image from 'next/image';
import type { InstagramFeedProps } from '@/types/section.types';
import styles from './InstagramFeed.module.css';

/** 12500 -> "12,5K", 2100000 -> "2,1M". Mismo criterio que usan las redes reales. */
function formatCount(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace('.0', '').replace('.', ',')}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1).replace('.0', '').replace('.', ',')}K`;
  return String(value);
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function InstagramFeed({
  username,
  displayName,
  profileImage,
  bio,
  postsCount,
  followersCount,
  followingCount,
  profileHref,
  ctaLabel = '¡Síguenos!',
  posts,
}: InstagramFeedProps) {
  return (
    <section className={styles.section}>
      <aside className={styles.profile}>
        <div className={styles.avatarWrapper}>
          <Image src={profileImage} alt={username} fill sizes="88px" className={styles.avatar} />
        </div>

        <a href={profileHref} target="_blank" rel="noreferrer" className={styles.username}>
          <InstagramIcon />
          @{username}
        </a>

        {displayName && <p className={styles.displayName}>{displayName}</p>}

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt className={styles.statValue}>{formatCount(postsCount)}</dt>
            <dd className={styles.statLabel}>publicaciones</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statValue}>{formatCount(followersCount)}</dt>
            <dd className={styles.statLabel}>seguidores</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statValue}>{formatCount(followingCount)}</dt>
            <dd className={styles.statLabel}>seguidos</dd>
          </div>
        </dl>

        {bio && <p className={styles.bio}>{bio}</p>}

        <a href={profileHref} target="_blank" rel="noreferrer" className={styles.followButton}>
          {ctaLabel}
        </a>
      </aside>

      <div className={styles.grid}>
        {posts.slice(0, 6).map((post) => (
          <a key={post.id} href={post.href} target="_blank" rel="noreferrer" className={styles.postTile}>
            <Image
              src={post.image}
              alt=""
              fill
              sizes="(max-width: 700px) 33vw, 220px"
              className={styles.postImage}
            />
          </a>
        ))}
      </div>
    </section>
  );
}