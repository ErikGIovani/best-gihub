import Head from "next/head";
import { useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { FaTelegramPlane } from "react-icons/fa";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import styles from "@/styles/Home.module.css";
import Place from "@/components/place";

export default function Home() {
  const placesRef = useRef(null);
  const [place, setPlace] = useState(0);

  const { scrollYProgress } = useScroll({
    target: placesRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPlace(latest);
  });

  return (
    <>
      <Head>
        <title>Best GitHub</title>
        <meta name="description" content="Who is the best in GitHub" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <img className={styles.left__curtain} src="/curtain-l.png" alt="" />
        <img className={styles.right__curtain} src="/curtain-r.png" alt="" />

        <section className={styles.first_section}>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.8 }}
            transition={{ type: "keyframe", duration: 1 }}
            className={styles.left__light}
            src="/lights.png"
            alt=""
          />
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.8 }}
            transition={{ type: "keyframe", duration: 1 }}
            className={styles.right__light}
            src="/lights.png"
            alt=""
          />
          <h1 className={styles.title}>Best GitHub</h1>
          <form className={styles.container__form}>
            <input
              className={styles.container__input}
              placeholder="GitHub Username..."
              type="text"
            />
            <button className={styles.container__button}>
              <FaTelegramPlane />
            </button>
          </form>
        </section>

        <section ref={placesRef} className={styles.second__section}>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: place === 1 ? 1 : 0 }}
            transition={{ type: "keyframe", duration: 1 }}
            className={styles.center__light}
            src="/light-c.png"
            alt=""
          />
          <motion.div
            initial={{ translateX: -1000 }}
            animate={{ translateX: place === 1 ? 0 : -1000 }}
            transition={{ type: "keyframe", duration: 1 }}
            className={styles.container__wins}
          >
            <Place place={2} />
            <Place place={1} />
            <Place place={3} />
          </motion.div>
          {place === 1 ? (
            <ConfettiExplosion
              particleCount={250}
              force={0.8}
              duration={3000}
              width={1600}
            />
          ) : null}
        </section>
      </main>
    </>
  );
}
