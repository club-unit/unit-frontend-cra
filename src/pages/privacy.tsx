import ContentHeaderSection from "src/components/common/ContentHeaderSection";

function PrivacyPolicy() {
  return (
    <div>
      <ContentHeaderSection title="개인정보처리방침" />
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>개인정보 처리방침 개요</span>
        </strong>
      </div>
      <p>
        본 개인정보 처리방침은 Unit(이하 "Unit")이 제공하는 서비스(이하 "서비스")를 이용하는
        사용자(이하 "사용자")의 개인정보 보호와 관련 법령 준수를 위해 마련되었습니다.
      </p>
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>1. 수집하는 개인정보 항목</span>
        </strong>
      </div>
      <p>
        Unit은 다음과 같은 개인정보를 수집합니다:
        <br />
        • 필수 정보: 이름, 이메일, 연락처, 생년월일, 성별
        <br />
        • 선택 정보: 주소, 학력 사항
        <br />• 자동 수집 정보: IP 주소, 쿠키, 서비스 이용 기록
      </p>
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>2. 개인정보 수집 방법</span>
        </strong>
      </div>
      <p>
        개인정보는 서비스 가입 및 이용 과정에서 사용자가 직접 입력하거나, 서비스 이용 중 자동으로
        수집되는 정보를 통해 확보됩니다.
      </p>
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>3. 개인정보 처리 목적</span>
        </strong>
      </div>
      <p>
        수집된 개인정보는 아래의 목적으로 사용됩니다:
        <br />
        • 회원 가입 및 관리
        <br />
        • 서비스 제공 및 운영
        <br />
        • 회원 문의 대응
        <br />
        • 맞춤형 서비스 제공
        <br />• 법적 의무 준수
      </p>
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>4. 개인정보의 보유 및 이용 기간</span>
        </strong>
      </div>
      <p>
        Unit은 개인정보의 수집 및 이용 목적이 달성되면 해당 정보를 즉시 파기합니다. 다만, 관련
        법령에 따라 일정 기간 보관할 수 있습니다.
      </p>
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>5. 개인정보 제공 및 위탁</span>
        </strong>
      </div>
      <p>
        Unit은 원칙적으로 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 다만, 법령에
        따른 요구나 서비스 제공을 위해 필요한 경우 제한적으로 제공할 수 있습니다.
      </p>
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>6. 개인정보 보호 조치</span>
        </strong>
      </div>
      <p>
        Unit은 개인정보 암호화, 접근 권한 관리, 해킹 및 보안 시스템 운영 등 적절한 보호 조치를
        시행하고 있습니다.
      </p>
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>7. 사용자 권리 및 행사 방법</span>
        </strong>
      </div>
      <p>
        사용자는 언제든지 본인의 개인정보를 조회, 수정, 삭제 요청할 수 있으며, Unit은 이에 대해
        신속하게 조치할 것입니다.
      </p>
      <div className="sub_title">
        <strong>
          <span style={{ color: "rgb(35, 111, 161)" }}>8. 정책 변경</span>
        </strong>
      </div>
      <p>
        본 개인정보 처리방침은 법령 변경 또는 Unit 정책에 따라 변경될 수 있으며, 변경 사항은 사전에
        공지됩니다.
        <br />
        최종 수정일: 2025-02-27
      </p>
    </div>
  );
}

export default PrivacyPolicy;
