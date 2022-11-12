import React, { useEffect, useRef, useState } from "react";
import Customer from "./utils/Customer";
import TileMap from "./utils/TileMap";
import Desk from "./utils/Desk";
import "./GameCore.css";

interface Point {
  x: number;
  y: number;
}
interface GameParams {
  tileMap: TileMap;
  tileSize: number;
}

export default function GameCore({tileMap, tileSize}:GameParams) {
  const canvas = useRef<HTMLCanvasElement>(null);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [desks, setDesks] = useState<Desk[]>([]);
  const [doors, setDoors] = useState<Point[]>([]);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    console.log("effect");
    setDesks([...tileMap.getDesks()]);
    setDoors([...tileMap.getDoors()]);
    tileMap.setCanvasSize(canvas.current);
  }, []);

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

    return new Customer(start, destinationPoint, tileSize, type, id, tileMap);
  };

  const gameLoop = () => {
    let _customers = [...customers];

    if (!pause) {
      let ran = Math.round(Math.random() * 100);

      if (ran > 92 && customers.length <= 15) {
        _customers.push(createRandomCustomer());
      } else if (ran < 3) {
        _customers.splice(
          Math.round(Math.random() * (_customers.length - 1)),
          1
        );
      }
    }

    updateCustomers(_customers);
    draw();
  };

  const draw = () => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");
      tileMap.draw(ctx);
      desks.forEach((desk) => desk.draw(ctx));
      customers.forEach((customer) => customer.draw(ctx, pause));
    }
  };


  
  setTimeout(gameLoop, 1000 / 50);

  return <canvas ref={canvas}/>;
}
