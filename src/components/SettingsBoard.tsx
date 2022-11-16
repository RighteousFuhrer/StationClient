import React, { FC, useEffect, useState } from "react";

import "./style.css";
import door from "../GameCore/images/door.png";
import wall from "../GameCore/images/wall.png";
import booth from "../GameCore/images/booth.png";
import floor from "../GameCore/images/floor.png";
import reservBooth from "../GameCore/images/reservBooth.jpg";

import { ISetiingsProps } from "../models/ISettings";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { stringify } from "querystring";

type IPosition = {
  x: number;
  y: number;
};

type Props = {
  doorsCoountProps: number;
  boothCoountProps: number;
  serviseTime: number;
  stategy: string;
};

const SettingsBoard = ({
  doorsCoountProps,
  boothCoountProps,
  serviseTime,
  stategy,
}: Props) => {
  const [deskMap, setDeskmap] = useState<Array<Array<number>>>([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]);
  const [listOffices, setListOffices] = useState<Array<IPosition> | []>([]);
  const [listStots, setListStots] = useState<Array<IPosition> | []>([]);
  const [listReserveTicketOffice, setListReserveTicketOffice] =
    useState<IPosition>({ x: 0, y: 0 });

  const [doorCount, setDoorCount] = useState(doorsCoountProps);
  const [boothoount, setBoothCount] = useState(boothCoountProps);
  const [reserveTicketOffice, setReserveTicketOffice] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    setDeskmap([
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
  }, [doorsCoountProps, boothCoountProps]);

  useEffect(() => {
    setDoorCount(doorsCoountProps);
    setBoothCount(boothCoountProps);
  }, [doorsCoountProps, boothCoountProps]);

  const imageValidate = (i: number, j: number) => {
    if (deskMap[i][j] === 2) {
      return door;
    } else if (deskMap[i][j] === 3) {
      return booth;
    } else if (deskMap[i][j] === 4) {
      return reservBooth;
    }
    if (i === 0 || i === 14 || j === 0 || j === 14) {
      return wall;
    } else {
      return floor;
    }
  };

  //console.log(listReserveTicketOffice);

  const addNewElemment = (i: number, j: number) => {
    if ((j === 0 || j === 14) && i !== 0 && i !== 14 && boothoount === 0) {
      const resultMap = deskMap;
      if (deskMap[i][j] === 4) {
        resultMap[i][j] = 1;
        setDeskmap(resultMap);
        setReserveTicketOffice((prev) => prev + 1);
        setListReserveTicketOffice({ x: 0, y: 0 });
      } else if (reserveTicketOffice !== 0 && resultMap[i][j] !== 3) {
        resultMap[i][j] = 4;
        setDeskmap(resultMap);
        setReserveTicketOffice((prev) => prev - 1);
        setListReserveTicketOffice({ x: i, y: j });
      }
    }
    if ((i === 0 || i === 14) && j !== 0 && j !== 14) {
      const resultMap = deskMap;
      if (deskMap[i][j] == 2) {
        resultMap[i][j] = 1;
        setDeskmap(resultMap);
        setDoorCount((prev) => prev + 1);
        const positionList = listOffices.filter(
          (offices) => offices.x !== i && offices.y !== j
        );
        setListOffices(positionList);
      } else if (doorCount !== 0) {
        resultMap[i][j] = 2;
        setDeskmap(resultMap);
        setDoorCount((prev) => prev - 1);
        setListOffices([...listOffices, { x: i, y: j }]);
      }
    } else if ((j === 0 || j === 14) && i !== 0 && i !== 14) {
      const resultMap = deskMap;
      if (deskMap[i][j] == 3) {
        resultMap[i][j] = 0;
        setDeskmap(resultMap);
        setBoothCount((prev) => prev + 1);
        const positionList = listStots.filter(
          (stors) => stors.x !== i && stors.y !== j
        );
        setListStots(positionList);
      } else if (boothoount !== 0 && resultMap[i][j] !== 4) {
        resultMap[i][j] = 3;
        setDeskmap(resultMap);
        setBoothCount((prev) => prev - 1);
        setListStots([...listStots, { x: i, y: j }]);
      }
    }
  };

  const mapDesc = deskMap.map((row, i) => {
    return row.map((item, j) => {
      return (
        <img
          key={i + j}
          src={imageValidate(i, j)}
          className="itemFild"
          onClick={() => addNewElemment(i, j)}
        />
      );
    });
  });

  const setSettingsDataHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:8080/api/v1/stationmanager",
      JSON.stringify({
        entrances: listOffices,
        ticketOffices: listStots,
        processingTime: serviseTime * 1000,
        reserveTicketOffice: listReserveTicketOffice,
        isRandomSpawnTime: stategy === "true",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  };

  // console.log(
  //   JSON.stringify({
  //     entrances: listOffices,
  //     ticketOffices: listStots,
  //     processingTime: serviseTime,
  //     reserveTicketOffice: listReserveTicketOffice,
  //     isRandomSpawnTime: stategy === "true",
  //   })
  // );
  // navigate("/game");

  return (
    <div className="settings-board__wrapper">
      <div className="elementCount__wrapper">
        <div className="elementCount">Door: {doorCount}</div>
        <div className="elementCount">Booth: {boothoount}</div>
        <div className="elementCount">Reserve booth: {reserveTicketOffice}</div>
      </div>
      <div className="settings-board__wrapper">{mapDesc}</div>

      <button onClick={setSettingsDataHandler} className="btnSaveSettings">
        Save settings
      </button>
    </div>
  );
};

export default SettingsBoard;
