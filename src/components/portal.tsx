import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";
import { FaGithub } from "react-icons/fa";

import styles from "./portal.module.css";

interface PortalProps {
  message: string;
  close: Dispatch<SetStateAction<string | null>>;
  error?: boolean;
}

const Portal = ({ message, error, close }: PortalProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "keyframe", duration: 1 }}
      className={styles.background}
    >
      <div className={styles.container}>
        <button className={styles.close} onClick={() => close(null)}>
          X
        </button>
        <FaGithub className={styles.github} />
        <p className={styles.text}>{message}</p>
        {error ||
        message === "Sorry, you are not in any of the first places" ? null : (
          <ConfettiExplosion
            particleCount={250}
            force={1}
            duration={3000}
            width={1600}
            height={1600}
            zIndex={11}
          />
        )}
      </div>
    </motion.section>
  );
};

export default Portal;
