import { useEffect, useState } from "react";

const Box = ({
  value,
  clickEvent,
  count,
  currentCurrentCount,
}: {
  value: boolean | null;
  clickEvent: () => void;
  currentCurrentCount: number;
  count: number;
}) => {
  return (
    <div
      onClick={clickEvent}
      style={{
        transition: " all 1s ease-out",
        transform: currentCurrentCount === count ? "scale(1.15)" : "",
        border: value
          ? "2px solid green"
          : value === false
          ? "2px solid red"
          : "2px solid grey",
        background: value ? "#56f15642" : value === false ? "#ff3b3b4a" : "",
        margin: "5px",
        borderRadius: "10px",
        cursor: "pointer",
        height: "50px",
        width: "50px",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: "bold" }}>
        {value ? "X" : value === false ? "O" : "-"}
      </span>
    </div>
  );
};

const GameComponent = ({
  size,
  setStart,
}: {
  size: number;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [matrix, setMatrix] = useState<
    { x: number; y: number; value: null | boolean; count: number }[]
  >([]);
  const [currentPlay, setCurrentPlay] = useState(true);
  const [gridTemplateColumns, setGridTemplateColumns] = useState<string[]>([
    "auto ",
  ]);
  const [winner, setWinner] = useState<null | string>(null);
  const [count, setCount] = useState(0);
  const checkResult = (
    matrix: {
      x: number;
      y: number;
      value: null | boolean;
    }[]
  ) => {
    const obj: Record<string, any> = {
      x: {},
      y: {},
      z: 0,
      w: 0,
    };
    matrix.forEach(({ x, y }) => {
      if (obj.x[x] === undefined) obj.x[x] = 0;
      if (obj.y[y] === undefined) obj.y[y] = 0;
      obj.x[x]++;
      obj.y[y]++;
      if (x === y) obj.z++;
      if (x + y === size - 1) obj.w++;
    });
    let result = false;
    result = Object.values(obj.x).includes(size);
    result = result ? result : Object.values(obj.y).includes(size);
    result = result ? result : obj.w === size;
    result = result ? result : obj.z === size;
    return result;
  };

  const filterCheck = (checkValue: boolean) => {
    const data = matrix.filter(({ value }) => value === checkValue);
    if (data.length === 0) return;
    if (checkResult(data)) return setWinner(checkValue ? "X" : "O");
    if (data.length > size) {
      let { x, y } = data.sort(({ count: a }, { count: b }) => a - b)[0];
      setMatrix((pre) =>
        pre.map((data) =>
          data.x === x && data.y === y
            ? { ...data, count: 0, value: null }
            : data
        )
      );
    }
  };

  const checkGame = () => {
    filterCheck(true);
    filterCheck(false);
  };

  const clickEvent = (X: number, Y: number) => {
    if (winner) return;
    setMatrix((pre) => {
      const index = pre.findIndex(({ x, y }) => x === X && y === Y);
      if (pre[index].value !== null) return pre;
      pre[index] = { ...pre[index], value: currentPlay, count: count + 1 };
      setCurrentPlay((p) => !p);
      return pre;
    });
    setCount(count + 1);
  };

  const restartGame = () => {
    setMatrix((pre) => pre.map((data) => ({ ...data, value: null })));
    setWinner(null);
    setCurrentPlay(true);
    setStart(false);
  };

  useEffect(checkGame, [currentPlay]);

  useEffect(() => {
    if (size < 2) {
      throw new Error("Size must be at least 2");
    }
    const boxSize = size * size;
    const boxes = [];
    for (let i = 0; i < boxSize; i++) {
      boxes.push({
        x: Math.floor(i / size),
        y: i % size,
        value: null,
        count: 0,
      });
    }
    setMatrix(boxes);
    setGridTemplateColumns(Array(size).fill("auto"));
  }, [size]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns.join(" "),
        }}
      >
        {matrix.map(({ value, x, y, count: ct }, index) => (
          <Box
            key={index}
            value={value}
            count={ct}
            currentCurrentCount={count}
            clickEvent={clickEvent.bind(null, x, y)}
          />
        ))}
      </div>
      {winner && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span>Winner is {winner}</span>
          <button onClick={restartGame} style={{ marginTop: "10px" }}>
            Restart
          </button>
        </div>
      )}
    </>
  );
};

export default GameComponent;
