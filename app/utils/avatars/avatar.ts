const AVATAR_URL = process.env.NEXT_PUBLIC_RESUME_AVATAR_URL;
const AVATAR_NAMES = [
  "deku.png",
  "enoske.png",
  "moon.png",
  "sleepy.png",
  "eren.png",
  "gojo.png",
  "goku.png",
  "hinata.png",
  "itachi.png",
  "luffy.png",
  "mikasa.png",
  "muichiro.png",
  "naruto.png",
  "nezuko-2.png",
  "nezuko.png",
  "rin.png",
  "shoto.png",
  "tanjiro.png",
  "zenitsu.png",
];
export const generateAvatar = () => {
  const avatar = AVATAR_NAMES[Math.floor(Math.random() * AVATAR_NAMES.length)];
  return `${AVATAR_URL}/${avatar}`;
};
