import React, { useRef } from "react";
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
  const repeatInfoRef = useRef<
    { numRows: number; numRepeats: number; offset: number }[]
  >(getRepeatInfo(storageKey));

  function reset(): void {
    writeAndExit(DEFAULT_REPEAT_INFO);
  }

  function select(): void {
    writeAndExit(repeatInfoRef.current);
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

  return (
    <Card className="shadow">
      <CardBody>
        <Form>
          <FormGroup>
            <Label htmlFor="rows">Rows</Label>
            <Input
              id="rows"
              type="number"
              defaultValue={repeatInfoRef.current[0].numRows}
              onChange={(e) => {
                repeatInfoRef.current[0].numRows = parseInt(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="repeats">Repeats</Label>
            <Input
              id="repeats"
              type="number"
              defaultValue={repeatInfoRef.current[0].numRepeats}
              onChange={(e) => {
                repeatInfoRef.current[0].numRepeats = parseInt(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="offset">Repeat starts on Row</Label>
            <Input
              id="offset"
              type="number"
              defaultValue={repeatInfoRef.current[0].offset}
              onChange={(e) => {
                repeatInfoRef.current[0].offset = parseInt(e.target.value);
              }}
            />
          </FormGroup>
        </Form>

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
  );
}

export default FreeStyleEditor;
