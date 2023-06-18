import React, { useState } from "react";
import { ProjectDetails } from "./ProjectDetails";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { RepeatInfo, getRepeatInfo, DEFAULT_REPEAT_INFO } from "./storage";

function FreeStyleEditor(props: {
  project: ProjectDetails;
  exitFn: () => void;
}) {
  const { storageKey } = props.project;
  const [repeatInfo, setRepeatInfo] = useState<RepeatInfo[]>(
    getRepeatInfo(storageKey)
  );

  function reset(): void {
    writeAndExit(DEFAULT_REPEAT_INFO);
  }

  function select(): void {
    writeAndExit(repeatInfo);
  }

  function addRepeat(): void {
    setRepeatInfo(repeatInfo.concat(DEFAULT_REPEAT_INFO[0]));
  }
  function removeRepeat(): void {
    setRepeatInfo([...repeatInfo].splice(-1, 1));
  }

  function writeAndExit(info: RepeatInfo[]): void {
    localStorage.setItem(
      `${storageKey}-repeatInfo`,
      JSON.stringify(info || [])
    );
    props.exitFn();
  }

  const formDetails = repeatInfo.map((info: RepeatInfo) => {
    return (
      <Card className="shadow mb-1">
        <CardBody>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="rows">Rows</Label>
                  <Input
                    id="rows"
                    type="number"
                    defaultValue={info.numRows}
                    onChange={(e) => {
                      info.numRows = parseInt(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="repeats">Repeats</Label>
                  <Input
                    id="repeats"
                    type="number"
                    defaultValue={info.numRepeats}
                    onChange={(e) => {
                      info.numRepeats = parseInt(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label htmlFor="offset">Repeat starts on Row</Label>
                  <Input
                    id="offset"
                    type="number"
                    defaultValue={info.offset}
                    onChange={(e) => {
                      info.offset = parseInt(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label htmlFor="chartOffset">Chart Row Equivalent</Label>
                  <Input
                    id="chartOffset"
                    type="number"
                    defaultValue={info.chartOffset || info.offset}
                    onChange={(e) => {
                      info.chartOffset = parseInt(e.target.value);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  });

  return (
    <>
      <div className="d-flex justify-content-end mb-1">
        <Button color="info" onClick={() => removeRepeat()}>
          <i className="fa fa-minus"></i>
        </Button>
        <Button color="info" onClick={() => addRepeat()}>
          <i className="fa fa-plus"></i>
        </Button>
      </div>

      {formDetails}

      <Card className="shadow">
        <CardBody>
          <div className="row align-items-center justify-content-around">
            <div className="col-1">
              <Button color="danger" onClick={() => reset()}>
                Reset
              </Button>
            </div>
            <div className="col-1">
              <Button color="primary" onClick={() => select()}>
                Select
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default FreeStyleEditor;
