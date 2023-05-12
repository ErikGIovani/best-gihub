import Head from "next/head";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { FaTelegramPlane } from "react-icons/fa";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import messages from "@/utils/messages";
import styles from "@/styles/Home.module.css";
import Place from "@/components/place";
import { userZodSchema } from "@/utils/validations";
import Portal from "@/components/portal";

export default function Home() {
  const placesRef = useRef(null);
  const [place, setPlace] = useState(0);
  const [places, setPlaces] = useState(null);
  const [user, setUser] = useState<string | null>(null);
  const [fetchMessage, setFetchMessage] = useState<string | null>(null);
  const [fetchErrorMessage, setFetchErrorMessage] = useState<string | null>(
    null
  );
  const [inputError, setInputError] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: placesRef,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPlace(latest);
  });

  useEffect(() => {
    fetch("/api/places/")
      .then((response) => response.json())
      .then((data) => setPlaces(data));
  }, [fetchMessage]);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = userZodSchema.safeParse({ username: user });

    if (!result.success) {
      setInputError(messages.user.message);
      return;
    }

    setInputError(null);

    fetch("/api/search-place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          setFetchErrorMessage(messages.error.message);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setFetchMessage(data.message);
      });

    e.currentTarget.reset();
    setUser(null);
  };

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
          <motion.h1
            initial={{ translateY: -1000 }}
            animate={{ translateY: 0 }}
            transition={{ type: "keyframe", duration: 1 }}
            className={styles.title}
          >
            Best GitHub
          </motion.h1>
          <motion.form
            initial={{ translateY: -1000 }}
            animate={{ translateY: 0 }}
            transition={{ type: "keyframe", duration: 1 }}
            onSubmit={handleSubmit}
            className={styles.container__form}
          >
            <input
              onChange={(e) => setUser(e.currentTarget.value)}
              className={styles.container__input}
              placeholder="GitHub Username..."
              type="text"
            />
            <button className={styles.container__button}>
              <FaTelegramPlane />
            </button>
            {inputError && (
              <p className={styles.error__message}>{inputError}</p>
            )}
          </motion.form>
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
            <Place place={2} user={places?.[1]} />
            <Place place={1} user={places?.[0]} />
            <Place place={3} user={places?.[2]} />
          </motion.div>
          {place === 1 ? (
            <ConfettiExplosion
              particleCount={250}
              force={0.8}
              duration={3000}
              height={1600}
              width={1600}
            />
          ) : null}
        </section>

        {fetchMessage && (
          <Portal message={fetchMessage} close={setFetchMessage} />
        )}
        {fetchErrorMessage && (
          <Portal
            error={true}
            message={fetchErrorMessage}
            close={setFetchErrorMessage}
          />
        )}
      </main>
    </>
  );
}
