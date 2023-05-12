import type { User } from "@prisma/client";
import styles from "./place.module.css";

const places = {
  1: "gold",
  2: "silver",
  3: "bronze",
};

const placesHeight = {
  1: "6rem",
  2: "5rem",
  3: "4rem",
};

const colorPlace = {
  1: "#ffff00",
  2: "#d2d3d5",
  3: "#e98458",
};

interface PlaceProps {
  user?: User;
  place: keyof typeof places;
}

const Place = ({ place, user }: PlaceProps) => {
  return (
    <div className={styles.place__container}>
      <img
        className={styles.place__image}
        src={`/${places[place]}.png`}
        alt=""
      />
      <p style={{ height: placesHeight[place] }} className={styles.place__base}>
        {place}
      </p>

      <div className={styles.place__user__container}>
        <img src={user?.avatar} alt="#" />
        <p>{user?.username}</p>
        <a
          style={{ background: colorPlace[place] }}
          href={user?.url}
          target="__blank"
        >
          Profile
        </a>
      </div>
    </div>
  );
};

export default Place;
