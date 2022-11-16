import React, { useEffect, useRef, useState } from "react";
import Customer from "./utils/Customer";
import TileMap from "./utils/TileMap";
import Desk from "./utils/Desk";
import "./GameCore.css";
import Door from "./utils/Door";
import { useGetGamePropsQuery } from "./api/apiGameProps";
import Core from "./utils/Core";

interface Point {
  x: number;
  y: number;
}

interface GameParams {
  tileMap: TileMap;
  tileSize: number;
  gameSpeed: number;
}

export default function GameCore({ tileMap, tileSize, gameSpeed }: GameParams) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useRef<any>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [desks, setDesks] = useState<Desk[]>([]);
  const [doors, setDoors] = useState<Door[]>([]);
  const [pause, setPause] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const core = useRef<Core>(new Core());

  const { data, status, error, refetch } = useGetGamePropsQuery(null, {
    pollingInterval: 2000,
    skip: pause,
  });

  useEffect(() => {
    // if (core.current) {
    //   core.current.start(gameLoop, 100);
    // }

    let newDoors = tileMap.getDoors();

    if (newDoors.length > 0) {
      setDoors([...newDoors]);
    }

    tileMap.setCanvasSize(canvas.current);
    if (canvas.current) {
      tileMap.draw(canvas.current.getContext("2d"));
    }

    return core.current.stop();
  }, []);

  useEffect(() => {
    //drawFrame();
  }, [customers, desks, doors]);

  useEffect(() => {
    updateGameProps();
    console.log(data);
  }, [data]);

  const updateCustomers = (_customers: Customer[]) => {
    let newCustomers: Customer[] = [];

    _customers.forEach((element) => {
      const customer = customers.filter((e) => e.id === element.id)[0];
      if (customer) {
        customer.update(element.destinationPoint);
        newCustomers.push(customer);
      } else {
        newCustomers.push(element);
      }
    });
    setCustomers([...newCustomers]);
  };

  const updateBooths = (_booths: Desk[]) => {
    let booths: Desk[] = [];

    _booths.forEach((element) => {
      const booth = desks.filter(
        (e) => e.x === element.x && e.y === element.y
      )[0];
      if (booth) {
        booth.updateState(element.isManaging);
        booths.push(booth);
      } else {
        booths.push(element);
      }
    });

    setDesks([...booths]);
  };

  const updateGameProps = () => {
    if (data) {
      if (data.people) {
        updateCustomers(
          data.people.map((p: any) => {
            return new Customer(
              {
                x: p.initialPosition.x * tileSize,
                y: p.initialPosition.y * tileSize,
              },
              {
                x: p.targetPosition.x * tileSize,
                y: p.targetPosition.y * tileSize,
              },
              tileSize,
              p.status,
              p.id,
              tileMap,
              gameSpeed
            );
          })
        );
      }
      updateBooths(
        data.offices.map((o: any) => {
          return new Desk(
            o.position.x * tileSize,
            o.position.y * tileSize,
            tileSize,
            o.isManaging
          );
        })
      );
    }
  };

  const gameLoop = () => {
    customers.forEach((element) =>{ 
      element.move(pause)
      setUpdateState(!updateState);
    });
    drawFrame();
  };

  const drawFrame = () => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      tileMap.draw(canvas.current.getContext("2d"));
      desks.forEach((desk) => desk.draw(ctx));
      doors.forEach((door) => door.draw(ctx));
      customers.forEach((customer) => customer.drawModel(ctx));
      customers.forEach((customer) => customer.drawId(ctx));
    }
  };

  setTimeout(gameLoop, 1000/180);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}
    >
      <canvas ref={canvas} />
      <button className="btnSaveSettings" onClick={() => setPause(!pause)}>
        {pause ? "Unpause" : "Pause"}
      </button>
    </div>
  );
}
