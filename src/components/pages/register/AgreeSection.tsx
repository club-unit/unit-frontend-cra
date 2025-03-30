import { Button, Card, Checkbox } from "antd";
import { useState } from "react";

interface Props {
  next: () => void;
}

function AgreeSection({ next }: Props) {
  const [ruleChecked, setRuleChecked] = useState(false);
  const [infoChecked, setInfoChecked] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Card title="유니트 회칙">
        <div className="sub_title">
          <strong>
            <span style={{ color: "rgb(35, 111, 161)" }}>제 1 장 총칙</span>
          </strong>
        </div>
        <p>
          <br />
          제1조 (명칭): 본회의 명칭은 &ldquo;대학연합레져스포츠클럽 unit&rdquo;라 칭한다.
          <br />
          <br />
          제2조 (목적): 본회의 목적은 다음과 같다.
          <br />
          레져스포츠를 통한 회원간의 친목도모와 건전한 대학 놀이 문화의 정착.
          <br />
          <br />
        </p>
        <div className="sub_title">
          <strong>
            <span style={{ color: "rgb(35, 111, 161)" }}>제 2 장 회원</span>
          </strong>
        </div>
        <p>
          <br />
          제1조 (회원자격): 본회의 회원은 서울, 경인지역 4년제 대학에 재(휴)학 중이거나 졸업한자로서
          본회의 취지에 맞는 교양과 자질을 겸비한 자로 한다.
          <br />
          <br />
          제2조 (자격상실): 다음 각호에 해당하는 경우 임원회의 결의로서 경고조치 또는 회원의 자격이
          상실된다.
          <br />- 회의를 통하여 결정된 본 회의 결정사유에 따르지 않거나 본회의 임원진의 지시에
          따르지 않는 때
          <br />- 회비 미납한 때
          <br />- 회원 간의 정보제공과 친목도모 등에 응하지 않거나 불성실한 때
          <br />- 본회의 목적에 위배되거나 명예를 훼손하는 행위를 한 때
          <br />- 본회의 활동에 있어 타 회원들이 이질감이 들도록 그룹을 만든 때
          <br />- 하극상을 행한 때
          <br />- 준회원의 경우 총단행사 2회, 정회원의 경우 총단행사 1회를 참가하지 않은 때
          <br />- 지구대 멤버쉽 출결회칙에 미달했을 때
          <br />- 휴동 시 결정한 복귀시기를 어길 때
          <br />
          <br />
          (특칙) : 전 회원은 항시 유니트 홈페이지(clubunit.kr)의 각 지구대 공지사항을 확인하고
          숙지하여 이에 따라 행한다. 회원의 과실 및 고의로 공지사항을 확인하지 않아 입은 손해 및
          피해는 본회의 책임이 없는 것으로 간주한다.
          <br />
          <br />
          제3조 (회원명칭): 회원명칭은 신입회원, 준회원, 정회원, OB회원으로 나눈다.
          <br />
          <br />
          제4조 (회원기준): 회원의 기준은 다음과 같이 한다.
          <br />
          1. 신입회원 : 매 학기 들어오는 회원
          <br />
          2. 준 회 원 : 신입회원부터 4학기까지 활동한 회원
          <br />
          3. 정 회 원 : 5학기 이상 9학기 미만 활동한 회원
          <br />
          5. OB 회원 : 9학기 이상 활동한 회원
          <br />
          <br />
          제5조 (휴동기준) : 동아리 휴동의 기준은 다음과 같이 한다.
          <br />
          1. 사유 외 휴동 불가 (사유 : 군대, 어학연수, 학교휴학)
          <br />
          2. 필요시 증명서 제출.
          <br />
          3. 휴동 시 복귀시기 결정 (미복귀시 제명)
          <br />
          4. 기타 사유 발생시 총단회의에서 결정한다.
          <br />
          <br />
        </p>
        <div className="sub_title">
          <span style={{ color: "rgb(35, 111, 161)" }}>
            <strong>제 3 장 임원 및 임기</strong>
          </span>
        </div>
        <p>&nbsp;</p>
        <p>
          제1조 (임원의 구성): 본회의 임원은 회장 1인, 부회장, 총무부장, 기획부장, 회계부장,
          홍보부장, 웹 관리자로 구성한다.
          <br />
          <br />
          제2조 (임기):
          <br />
          - 본회의 임원임기는 두학기로 한다.
          <br />
          - 지구대임원의 임기는 한학기로 하한다.
          <br />
          <br />
          제3조 (임원의 임무): 본회의 임원의 임무는 다음과 같다.
          <br />
          1. 회 장 : 본회를 대표하고 회의 여부를 총괄하며 회의 시 의장의 역할을 수행한다
          <br />
          2. 부회장 : 회장을 보좌하며 임원진을 관리한다.
          <br />
          3. 총 무 : 행사에 필요한 모든 서류 작업을 담당한다.
          <br />
          4. 기 획 : 행사에 필요한 예약업무와 일정 기획 등을 담당한다.
          <br />
          5. 회 계 : 회계 출납 업무를 담당한다.
          <br />
          6. 홍 보: 본회의 홍보 및 행사 준비 등의 임무를 총괄한다.
          <br />
          7. 웹 관리자: 홈페이지의 모든 사항을 관리한다.
          <br />※ 각 지구대 팀장은 본회의 취지를 완벽히 숙지하여야 하며, 자신의 지구대 회원들을
          취지에 맞춰 이끌어 나가야 할 의무와 책임이 있다.
        </p>
        <p>&nbsp;</p>
        <div className="sub_title">
          <span style={{ color: "rgb(35, 111, 161)" }}>
            <strong>제 4 장 회의</strong>
          </span>
        </div>
        <p>
          <br />
          제1조 (회의): 회의는 다음과 같다.
          <br />
          1. 정기총회 : 정기총회는 매년 2월과 8월 중에 하고 장소 및 시간은 임원진에서 결정하며
          임원에게 통보한다.
          <br />
          2. 행사 관련 회의 : 행사 때 마다 필요 시 소집하고 장소 및 시간은 임원진에서 결정하여
          임원에게 통보한다.
          <br />
          3. 긴급 회의 : 긴급 사항 발생시 소집하고 장소 및 시간은 임원진에서 결정하여 임원에게
          통보한다.
          <br />
          <br />
          제2조 (회의 의사결정):
          <br />
          1. 정기총회 : 한학기 계획, 임원선출, 회칙수정, 예산심의, 사업보고
          <br />
          2. 행사 관련 회의 : 행사 준비
          <br />
          3. 긴급 회의 : 긴급 사항 대처 및 대응
          <br />
          <br />
          제3조 (의결 정족수)
          <br />
          본회의 의결은 임원 과반수의 출석과 과반수의 찬성으로 하며 과반수의 회원찬성을 득해야 한다.
          <br />
          <br />
        </p>
        <div className="sub_title">
          <span style={{ color: "rgb(35, 111, 161)" }}>
            <strong>제 5 장 회비 및 회계</strong>
          </span>
        </div>
        <p>
          <br />
          제1조 (회비)
          <br />- 본회의 회비는 총단(전 지구대)운영비와 지구대 운영비를 합친 금액이다.
          <br />- 본회의 회비 중 총단 운영비는 신입회원 30,000원 준회원 35,000원, 정회원
          30,000원으로 한다.
          <br />- 본회의 지구대 운영비는 10,000원으로 한다.
          <br />- 학기마다 모든 회원은 총단 운영비와 지구대 운영비를 합한 금액을 납부해야 한다.
          <br />- 단, 각 지구대 팀장, 본회의 임원, OB회원, 역대회장단에게는 회비를 수납하지 않는다.
          <br />- 역대회장단은 패러글라이딩, 스키캠프를 제외한 모든 총단행사를 무료로 참가 할 수
          있다.
          <br />- 총단은 매 행사를 마친 후 2주 내로 회계내역을 공개할 의무를 가진다.
          <br />
          <br />
          제2조 (회비지출)
          <br />- 행사에 대한 활동 지원비
          <br />- 기타 회에서 정하는 비용
          <br />
          <br />
          제3조 (수입)
          <br />- 본회의 수입은 회비 찬조금 등이다.
          <br />
          <br />
          제4조 (회계 연도)
          <br />- 회계연도는 본회의 임원 임기로 한다.
          <br />
          <br />
          제5조 (환불 규정) : 회원 회비 환불 기준
          <br />- OT 전 : 전액 환불
          <br />- OT 이후 첫 멤버쉽 전 : 지구대 운영비를 제외한 총단 운영비를 전액 환불
          <br />- 첫 멤버쉽 이후 : 환불 불가
          <br />※ OT를 진행할 수 없는 경우 각 지구대의 회칙을 따름을 원칙으로 한다.
          <br />
          <br />
        </p>
        <div className="sub_title">
          <span style={{ color: "rgb(35, 111, 161)" }}>
            <strong>제 6 장 회칙개정</strong>
          </span>
        </div>
        <p>
          <br />
          회칙개정은 임원 과반수의 발의에 의거 과반수 출석과 2/3의 동의를 받아야 한다.
          <br />
          <br />
        </p>
        <div className="sub_title">
          <span style={{ color: "rgb(35, 111, 161)" }}>
            <strong>제 7 장 부칙</strong>
          </span>
        </div>
        <p>
          <br />
          본 회칙은 2002년 8월 25일에 작성
          <br />
          2005년 8월 23일에 개정
          <br />
          2009년 7월 21일에 5장 1조 내용 개정
          <br />
          2011년 3월 23일에 2장 2조, 2장 4조, 5장 1조 내용 개정, 2장 5조, 5장 5조 신설
          <br />
          2020년 2월 11일에 5장 1조 내용 개정
          <br />
          2020년 3월 6일에 5장 1조, 5장 5조 내용 개정
          <br />
          2020년 8월 21일에 5장 1조 내용 개정
          <br />
          2023년 2월 10일에 5장 1조, 5조 내용 개정
          <br />
          2024년 2월 10일에 5장 1조, 5조 내용 개정
        </p>
        <Checkbox
          onChange={(e) => {
            setRuleChecked(e.target.checked);
          }}
          checked={ruleChecked}
          className="mt-8"
        >
          유니트 회칙에 동의합니다.
        </Checkbox>
      </Card>
      <Card title="개인정보처리방침">
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
          본 개인정보 처리방침은 법령 변경 또는 Unit 정책에 따라 변경될 수 있으며, 변경 사항은
          사전에 공지됩니다.
          <br />
          최종 수정일: 2025-02-27
        </p>
        <Checkbox
          onChange={(e) => {
            setInfoChecked(e.target.checked);
          }}
          checked={infoChecked}
          className="mt-8"
        >
          개인정보처리방침에 동의합니다.
        </Checkbox>
      </Card>
      <div className="flex w-full gap-2 justify-end mt-2">
        <Button type="primary" disabled={!(ruleChecked && infoChecked)} onClick={() => next()}>
          다음 단계로
        </Button>
      </div>
    </div>
  );
}

export default AgreeSection;
