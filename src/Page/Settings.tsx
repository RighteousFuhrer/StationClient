import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import BoardSettings from "../components/SettingsBoard";
import { ISetiingsProps } from "../models/ISettings";



const Settings = () => {
  const [settingsData, setSettingsData] = useState<ISetiingsProps>({
    countCashRegister: 2,
    countExits: 2,
    serviseTime: 2,
    stategy: "true",
  });
  const navigate = useNavigate();

  const verifiedMaxNumber = (
    value: string,
    max: number,
    fild: string,
    min: number
  ) => {
    const valueNumber = +value;
    if ((valueNumber <= max && valueNumber >= min) || value === "") {
      setSettingsData({
        ...settingsData,
        [fild]: value,
      });
    }
  };

  const setSettingsDataHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/game");
  };

  return (
    <div className="settingPage">
      <h2>Settings</h2>
      <form onSubmit={setSettingsDataHandler}>
        <span>
          Кількість кас:
          <input
            type="number"
            min="2"
            max="7"
            value={settingsData.countCashRegister}
            onChange={(e) =>
              verifiedMaxNumber(e.target.value, 7, "countCashRegister", 2)
            }
          />
        </span>
        <span>
          Кількість входів:
          <input
            type="number"
            min="1"
            max="4"
            value={settingsData.countExits}
            onChange={(e) =>
              verifiedMaxNumber(e.target.value, 4, "countExits", 1)
            }
          />
        </span>

        <span>
          Норма обслуговування квитка (в секундах):
          <input
            type="number"
            min="2"
            max="6"
            value={settingsData.serviseTime}
            onChange={(e) =>
              verifiedMaxNumber(e.target.value, 6, "serviseTime", 2)
            }
          />
        </span>

        <span>
          Стратегія генерування відвідувачів:
          <select
            className="selectStrategy"
            onChange={(e) =>
              setSettingsData({ ...settingsData, stategy: e.target.value })
            }
          >
            <option value={"true"}>Рівномірні</option>
            <option value={"false"}>Випадкові</option>
          </select>
        </span>
        <BoardSettings  doorsCoountProps = {settingsData.countExits}
    boothCoountProps = {settingsData.countCashRegister} />
        <button type="submit" className="btnSaveSettings">
          Save settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
