import { Image } from "antd";
import { User } from "src/types/api/user";
import { Author } from "src/types/api/author";

interface Props {
  user: User | Author;
  height: number;
}

function BadgeSet({ user, height }: Props) {
  return user.profile.responsibility !== "NONE" && user.profile.responsibility !== "NORMAL" ? (
    <Image
      height={height}
      width={height * 1.75}
      src={`/icons/responsibility/${user.profile.responsibility}.png`}
      alt={String(user?.profile.responsibility)}
      preview={false}
    />
  ) : (
    <Image
      height={height}
      width={height * 1.75}
      src={`/icons/rank/${user.profile.rank}.png`}
      alt={String(user.profile.rank)}
      preview={false}
    />
  );
}

export default BadgeSet;
