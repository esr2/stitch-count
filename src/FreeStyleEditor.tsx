import React, { useRef } from "react";
import {
  DEFAULT_FREESTYLE_NUM_REPEATS,
  DEFAULT_FREESTYLE_NUM_ROWS,
  ProjectDetails,
} from "./ProjectDetails";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

function FreeStyleEditor(props: {
  project: ProjectDetails;
  exitFn: () => void;
}) {
  const { storageKey } = props.project;
  const numRepeatsRef = useRef<number>(
    parseInt(
      localStorage.getItem(`${storageKey}-numRepeats`) ||
        DEFAULT_FREESTYLE_NUM_REPEATS
    )
  );
  const numRowsRef = useRef<number>(
    parseInt(
      localStorage.getItem(`${storageKey}-numRows`) ||
        DEFAULT_FREESTYLE_NUM_ROWS
    )
  );

  function reset(): void {
    writeAndExit(
      parseInt(DEFAULT_FREESTYLE_NUM_REPEATS),
      parseInt(DEFAULT_FREESTYLE_NUM_ROWS)
    );
  }

  function select(): void {
    writeAndExit(numRepeatsRef.current, numRowsRef.current);
  }

  function writeAndExit(repeats: number, rows: number): void {
    localStorage.setItem(`${storageKey}-numRepeats`, repeats.toString());
    localStorage.setItem(`${storageKey}-numRows`, rows.toString());
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
              defaultValue={numRowsRef.current}
              onChange={(e) => {
                numRowsRef.current = parseInt(e.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="repeats">Repeats</Label>
            <Input
              id="repeats"
              type="number"
              defaultValue={numRepeatsRef.current}
              onChange={(e) => {
                numRepeatsRef.current = parseInt(e.target.value);
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
