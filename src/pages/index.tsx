import { Layout, Menu, MenuProps } from "antd";
import Link from "next/link";

const menuItems: MenuProps["items"] = [
  {
    label: <Link href="#">홈</Link>,
    key: "home",
  },
  {
    label: "게시판",
    key: "boards",
    children: [
      {
        label: <Link href="#">유니트회칙</Link>,
        key: "rules",
      },
      {
        label: <Link href="#">공지사항</Link>,
        key: "notices",
      },
      {
        label: <Link href="#">갤러리</Link>,
        key: "gallery",
      },
      {
        label: <Link href="#">신입모집</Link>,
        key: "recruitment",
      },
      {
        label: <Link href="#">협찬/교류</Link>,
        key: "sponsor",
      },
    ],
  },
  {
    label: "지구대",
    key: "teams",
    children: [
      {
        label: <Link href="#">그린</Link>,
        key: "green",
      },
      {
        label: <Link href="#">동아</Link>,
        key: "donga",
      },
      {
        label: <Link href="#">시티</Link>,
        key: "city",
      },
      {
        label: <Link href="#">유니온</Link>,
        key: "union",
      },
      {
        label: <Link href="#">잠실</Link>,
        key: "jamsil",
      },
      {
        label: <Link href="#">정산</Link>,
        key: "jungsan",
      },
    ],
  },
  {
    label: "소모임",
    key: "subs",
    children: [
      {
        label: <Link href="#">볼링</Link>,
        key: "bowling",
      },
      {
        label: <Link href="#">적시타</Link>,
        key: "baseball",
      },
      {
        label: <Link href="#">보드</Link>,
        key: "snowboard",
      },
      {
        label: <Link href="#">축구</Link>,
        key: "soccer",
      },
    ],
  },
  {
    label: "이벤트",
    key: "event",
    children: [
      {
        label: <Link href="#">공지</Link>,
        key: "eventNotices",
      },
      {
        label: <Link href="#">당첨자발표</Link>,
        key: "eventWinners",
      },
      {
        label: <Link href="#">기타</Link>,
        key: "eventOthers",
      },
    ],
  },
  {
    label: "임원",
    key: "executives",
    children: [
      {
        label: <Link href="#">그린</Link>,
        key: "executivesGreen",
      },
      {
        label: <Link href="#">동아</Link>,
        key: "executivesDonga",
      },
      {
        label: <Link href="#">시티</Link>,
        key: "executivesCity",
      },
      {
        label: <Link href="#">유니온</Link>,
        key: "executivesUnion",
      },
      {
        label: <Link href="#">잠실</Link>,
        key: "executivesJamsil",
      },
      {
        label: <Link href="#">정산</Link>,
        key: "executivesJungsan",
      },
    ],
  },
  {
    label: "총단",
    key: "central",
    children: [
      {
        label: <Link href="#">회의록</Link>,
        key: "minutes",
      },
      {
        label: <Link href="#">회계록</Link>,
        key: "account",
      },
      {
        label: <Link href="#">피드백</Link>,
        key: "feedback",
      },
      {
        label: <Link href="#">총게</Link>,
        key: "centraljBoard",
      },
      {
        label: <Link href="#">명단(임원이상)</Link>,
        key: "list",
      },
      {
        label: <Link href="#">총단데이터(총단이상)</Link>,
        key: "centralData",
      },
    ],
  },
];

export default function MainPage() {
  return (
    <Layout>
      <Layout.Header>
        <Menu
          items={menuItems}
          mode="horizontal"
          className="bg-transparent text-white text-lg font-bold"
        />
      </Layout.Header>
      <Layout.Content></Layout.Content>
      <Layout.Footer></Layout.Footer>
    </Layout>
  );
}
