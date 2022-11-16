import React, { useEffect, useRef, useState } from "react";
import Customer from "./utils/Customer";
import TileMap from "./utils/TileMap";
import Desk from "./utils/Desk";
import "./GameCore.css";
import Door from "./utils/Door";
import { useGetGamePropsQuery } from "./api/apiGameProps";
import Core from "./utils/Core";
import ReserveBooth from "./utils/ReserveBooth";
import axios from "axios";

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
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [desks, setDesks] = useState<Desk[]>([]);
  const [doors, setDoors] = useState<Door[]>([]);
  const [pause, setPause] = useState(false);
  const [reserveBooth, setReserveBooth] = useState<any>(null);
  const [updateState, setUpdateState] = useState(false);
  const core = useRef<Core>(new Core());

  const { data, status, error, refetch } = useGetGamePropsQuery(null, {
    pollingInterval: 1000,
    skip: pause,
  });

  useEffect(() => {
    // if (core.current) {
    //   core.current.start(gameLoop, 100);
    // }

    // let newDoors = tileMap.getDoors();

    // if (newDoors.length > 0) {
    //   setDoors([...newDoors]);
    // }

    tileMap.setCanvasSize(canvas.current);
    if (canvas.current) {
      tileMap.draw(canvas.current.getContext("2d"));
    }

    return core.current.stop();
  }, []);

  useEffect(() => {}, [customers, desks, doors]);

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

  const updateDoors = (_doors: Door[]) => {
    let newDoors: Door[] = [];

    _doors.forEach((element) => {
      const door = doors.filter(
        (e) => e.x === element.x && e.y === element.y
      )[0];
      if (door) {
        newDoors.push(door);
      } else {
        newDoors.push(element);
      }
    });

    setDoors([...newDoors]);
  };

  const updateGameProps = () => {
    if (data) {
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
      updateDoors(
        data.spots.map((o: any) => {
          return new Door(
            o.position.x * tileSize,
            o.position.y * tileSize,
            tileSize
          );
        })
      );
      if (data.reservedTicketOffice)
        setReserveBooth(
          new ReserveBooth(
            data.reservedTicketOffice.position.x * tileSize,
            data.reservedTicketOffice.position.y * tileSize,
            tileSize,
            data.reservedTicketOffice.isManaging
          )
        );
    }
  };

  const gameLoop = () => {
    customers.forEach((element) => {
      element.move(pause);
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
      if (reserveBooth) {
        reserveBooth.draw(ctx);
      }
      customers.forEach((customer) => customer.drawModel(ctx));
      customers.forEach((customer) => customer.drawId(ctx));
    }
  };

  const handlePause = async () => {
    axios
      .post("http://localhost:8080/api/v1/stationmanager/turnOffStationSimulator")
      .then(() => {
        setPause(!pause);
      });
  };

  setTimeout(gameLoop, 1000 / 180);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "2rem" }}
    >
      <canvas ref={canvas} />
      <button className="btnSaveSettings" onClick={handlePause}>
        {pause ? "Unpause" : "Pause"}
      </button>
    </div>
  );
}
