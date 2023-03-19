import { Button } from "reactstrap";

function ButtonRow(props: {
  decrease: () => void;
  increase: () => void;
  index: number;
}) {
  const { decrease, increase, index } = props;
  return (
    <div className="row align-items-center">
      <div className="col">
        <Button block color="primary" size="lg" onClick={() => decrease()}>
          <i className="fa fa-minus"></i>
        </Button>
      </div>{" "}
      <div className="col">
        <h1 className="display-1 text-center">{index}</h1>
      </div>
      <div className="col">
        <Button block color="primary" size="lg" onClick={() => increase()}>
          <i className="fa fa-plus"></i>
        </Button>
      </div>
    </div>
  );
}

export default ButtonRow;
