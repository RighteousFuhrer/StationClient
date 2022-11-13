import React, { useEffect, useRef, useState } from "react";
import Customer from "./utils/Customer";
import TileMap from "./utils/TileMap";
import Desk from "./utils/Desk";
import "./GameCore.css";
import Door from "./utils/Door";
import { useGetGamePropsQuery } from "./api/apiGameProps";

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

  const { data, status, error, refetch } = useGetGamePropsQuery(null, {
    pollingInterval: 500,
  });

  useEffect(() => {
    let res = tileMap.getDesks();

    if (res.length > 0) {
      setDesks([...res]);
    }

    res = tileMap.getDoors();

    if (res.length > 0) {
      setDoors([...res]);
    }
    tileMap.setCanvasSize(canvas.current);

    return () => {
      if (frame.current) {
        clearTimeout(frame.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log(data);
  }, data);

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

  const createRandomCustomer = () => {
    let temp = Math.floor(Math.random() * doors.length);

    const start = { x: doors[temp].x, y: doors[temp].y };
    const destinationPoint = {
      x: Math.round(Math.random() * 12 + 1) * tileSize,
      y: Math.round(Math.random() * 12 + 1) * tileSize,
    };
    const id = 1000 * Math.round(Math.random() * 999);

    temp = Math.round(Math.random() * 15);
    let type;

    if (temp < 10) {
      type = 0;
    } else if (temp < 13) {
      type = 1;
    } else {
      type = 2;
    }

    return new Customer(
      start,
      destinationPoint,
      tileSize,
      type,
      id,
      tileMap,
      gameSpeed
    );
  };

  const gameLoop = () => {
    let _customers = [...customers];

    if (!pause) {
      let ran = Math.round(Math.random() * 100);

      if (ran > 92 && customers.length <= 15) {
        _customers.push(createRandomCustomer());
      } else if (ran < 2) {
        _customers.splice(
          Math.round(Math.random() * (_customers.length - 1)),
          1
        );
      }
    }

    updateCustomers(_customers);
    drawFrame();
  };

  frame.current = setTimeout(gameLoop, 1000 / 90);

  const drawFrame = () => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      tileMap.draw(ctx);
      desks.forEach((desk) => desk.draw(ctx));
      doors.forEach((door) => door.draw(ctx));
      customers.forEach((customer) => customer.drawModel(ctx, pause));
      customers.forEach((customer) => customer.drawId(ctx));
    }
  };

  return <canvas ref={canvas} />;
}
