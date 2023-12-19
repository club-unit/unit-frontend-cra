import ContentHeaderSection from "src/components/common/ContentHeaderSection";

function PrivacyPolicy() {
  return (
    <div>
      <ContentHeaderSection title="개인정보처리방침" />
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>개인정보 수집 및 이용</span>
        </strong>
      </div>
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>■ 총 칙</span>
        </strong>
      </div>
      <p>
        ① 개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명, 주민등록번호 등의
        사항에 의하여 당해 개인을 식별할 수 있는 정보(당해 정보만으로는 특정 개인을 식별할 수
        없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다)를 말합니다.
        <br />② unit는 귀하의 개인정보보호를 매우 중요시하며,『정보통신망이용촉진 및 정보보호에 관한
        법률』상의 개인정보 보호규정 및 정보통신부가 제정한 『개인정보보호지침』을 준수하고
        있습니다. unit는 개인정보보호정책을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와
        방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
      </p>
      <div className="sub_title">
        <span style={{ color: "rgb(35, 111, 161)" }}>
          <strong>■ 개인정보의 수집범위</strong>
        </span>
      </div>
      <p>
        별도의 회원가입 절차 없이도 Q&amp;A 게시판 글쓰기는 가능합니다. 다만, 회원제 서비스를
        이용하시고자 할 경우 다음의 정보를 입력 해 주셔야 합니다.
      </p>
      <p>
        ① 회원 가입 시 수집하는 개인정보의 범위
        <br />
        ㆍ필수 항목 : 이메일 주소, 비밀번호, 성명, 주소, 연락처
      </p>
      <div className="sub_title">
        <span style={{ color: "rgb(35, 111, 161)" }}>
          <strong>■ 개인정보 수집에 대한 동의</strong>
        </span>
      </div>
      <p>
        귀하께서 unit의 개인정보보호방침 또는 이용약관의 내용에 대해「동의한다」버튼 또는 「동의하지
        않는다」버튼을 클릭할 수 있는 절차를 마련하여, 「동의한다」버튼을 클릭하면 개인정보 수집에
        대해 동의한 것으로 봅니다.
      </p>
      <div className="sub_title">
        <span style={{ color: "rgb(35, 111, 161)" }}>
          <strong>■ 목적 외 사용 및 제3자에 대한 제공 및 공유</strong>
        </span>
      </div>
      <p>
        ① unit는 귀하의 개인정보를 「개인정보의 수집목적 및 이용목적」에서 고지한 범위 내에서
        사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타기업 및 기관에 제공하지 않습니다.
      </p>
      <div className="sub_title">
        <span style={{ color: "rgb(35, 111, 161)" }}>
          <strong>■ 개인정보의 열람, 정정</strong>
        </span>
      </div>
      <p>
        ① 귀하는 언제든지 등록되어 있는 귀하의 개인정보를 열람하거나 정정하실 수 있습니다.
        개인정보열람 및 정정을 하고자 할 경우에는로그인 후『회원정보수정』을 클릭하여 직접 열람 또는
        정정하거나, 개인정보관리책임자 및 담당자에게 서면, 전화 또는 E-mail로 연락하시면 지체없이
        조치하겠습니다.
        <br />② 귀하가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 당해 개인
        정보를 이용 또는 제공하지 않습니다.
        <br />③ 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체없이
        통지하여 정정하도록 조치하겠습니다.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
