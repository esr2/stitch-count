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
} from "reactstrap";
import { getRepeatInfo, DEFAULT_REPEAT_INFO } from "./storage";

function FreeStyleEditor(props: {
  project: ProjectDetails;
  exitFn: () => void;
}) {
  const { storageKey } = props.project;
  const [repeatInfo, setRepeatInfo] = useState<
    { numRows: number; numRepeats: number; offset: number }[]
  >(getRepeatInfo(storageKey));

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

  function writeAndExit(
    info: {
      numRows: number;
      numRepeats: number;
      offset: number;
    }[]
  ): void {
    localStorage.setItem(
      `${storageKey}-repeatInfo`,
      JSON.stringify(info || [])
    );
    props.exitFn();
  }

  const formDetails = repeatInfo.map(
    (info: { numRows: number; numRepeats: number; offset: number }) => {
      return (
        <Card className="shadow">
          <CardBody>
            <Form>
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
            </Form>
          </CardBody>
        </Card>
      );
    }
  );

  return (
    <>
      <div className="row justify-content-end">
        <div className="col-1">
          <Button color="info" onClick={() => removeRepeat()}>
            <i className="fa fa-minus"></i>
          </Button>
        </div>
        <div className="col-1">
          <Button color="info" onClick={() => addRepeat()}>
            <i className="fa fa-plus"></i>
          </Button>
        </div>
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
