import { Col, Row } from "antd";
import BranchCard from "@/components/pages/index/BranchCard";

function BranchSection() {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <BranchCard slug="green" />
        </Col>
        <Col span={8}>
          <BranchCard slug="donga" />
        </Col>
        <Col span={8}>
          <BranchCard slug="city" />
        </Col>
        <Col span={8}>
          <BranchCard slug="union" />
        </Col>
        <Col span={8}>
          <BranchCard slug="jamsil" />
        </Col>
        <Col span={8}>
          <BranchCard slug="jungsan" />
        </Col>
      </Row>
    </>
  );
}

export default BranchSection;
