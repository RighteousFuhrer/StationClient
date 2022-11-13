import React, { FC, useEffect, useState } from "react";

import "./style.css";
import door from "../GameCore/images/door.png";
import wall from "../GameCore/images/wall.png";
import booth from "../GameCore/images/booth.png";
import floor from "../GameCore/images/floor.png";
import { ISetiingsProps } from "../models/ISettings";

type IPosition = {
  x: number;
  y: number;
};

type Props = {
  doorsCoountProps: number;
  boothCoountProps: number;
};

const SettingsBoard = ({ doorsCoountProps, boothCoountProps }: Props) => {
  const [deskMap, setDeskmap] = useState<Array<Array<number>>>([
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
  const [listOffices, setListOffices] = useState<Array<IPosition> | []>([]);
  const [listStots, setListStots] = useState<Array<IPosition> | []>([]);

  const [doorCount, setDoorCount] = useState(doorsCoountProps);
  const [boothoount, setBoothCount] = useState(boothCoountProps);

  useEffect(() => {
    setDoorCount(doorsCoountProps);
    setBoothCount(boothCoountProps);
  }, []);

  useEffect(() => {
    setDoorCount(doorsCoountProps);
    setBoothCount(boothCoountProps);

  }, [doorsCoountProps, boothCoountProps]);

  //console.log(doorsCoountProps, doorCount);

  const imageValidate = (i: number, j: number) => {
    if (deskMap[i][j] === 2) {
      return door;
    } else if (deskMap[i][j] === 3) {
      return booth;
    }
    if (i === 0 || i === 14 || j === 0 || j === 14) {
      return wall;
    } else {
      return floor;
    }
  };

  const addNewElemment = (i: number, j: number) => {
    if (i === 0 || i === 14 || j === 0 || j === 14) {
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
    } else {
      const resultMap = deskMap;
      if (deskMap[i][j] == 3) {
        resultMap[i][j] = 0;
        setDeskmap(resultMap);
        setBoothCount((prev) => prev + 1);
        const positionList = listStots.filter(
          (stors) => stors.x !== i && stors.y !== j
        );
        setListStots(positionList);
      } else if (boothoount !== 0) {
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

  return (
    <div className="settings-board__wrapper">
      <div className="elementCount__wrapper">
        <div className="elementCount">Door: {doorCount}</div>
        <div className="elementCount">Booth: {boothoount}</div>
      </div>
      <div>{mapDesc}</div>
    </div>
  );
};

export default SettingsBoard;
