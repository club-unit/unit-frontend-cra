import { Image } from "antd";
import { MyUser } from "src/types/api/user";
import { Author } from "src/types/api/author";

interface Props {
  user: MyUser | Author;
  height: number;
  onlyLeaders?: boolean;
}

function BadgeSet({ user, height, onlyLeaders = false }: Props) {
  const shouldShowResponsibility = onlyLeaders
    ? user.profile.responsibility === "BRANCH_LEADER" ||
      user.profile.responsibility === "CLUB_LEADER"
    : user.profile.responsibility !== "NONE" && user.profile.responsibility !== "NORMAL";

  return shouldShowResponsibility ? (
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
