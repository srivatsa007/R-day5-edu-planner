import React, { useState } from "react";
import UInput from "./Uinput";
import "./style/landing.css";
import Card from "./Card";
import { GiSurprisedSkull } from "react-icons/gi";

export default function Main() {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("");
  const [planner, setPlanner] = useState(
    JSON.parse(localStorage.getItem("ABC"))
  );
  const [appearDialog, setDialog] = useState(false);
  const getDataFromUser = (e) => {
    e.preventDefault();
    const newSubject = e.target.children[0].value;
    const newDuration = e.target.children[1].value;

    addItem(newSubject, newDuration);

    setSubject((e.target.children[0].value = ""));
    setDuration((e.target.children[1].value = ""));
  };
  function addItem(key, value) {
    if (key == "" || value == "") {
      setDialog(true);
      return;
    }
setDialog(false);
    const updatePlanner = [
      ...planner,
      {
        id: "Planner" + Date.now(),
        subject: key,
        duration: value,
      },
    ];
    localStorage.setItem("ABC", JSON.stringify(updatePlanner));
    const newPlanner = localStorage.getItem("ABC");
    if (newPlanner) {
      setPlanner(JSON.parse(newPlanner));
    }
  }

  function onDecrease(idx) {
    const decPlanner = JSON.parse(JSON.stringify(planner));
    decPlanner[idx] = {
      ...decPlanner[idx],
      duration: +decPlanner[idx].duration - 1,
    };
    setPlanner(decPlanner);
    localStorage.setItem("ABC", JSON.stringify(decPlanner));
  }
  function onIncrease(idx) {
    const incPlanner = JSON.parse(JSON.stringify(planner));
    incPlanner[idx] = {
      ...incPlanner[idx],
      duration: +incPlanner[idx].duration + 1,
    };
    setPlanner(incPlanner);
    localStorage.setItem("ABC", JSON.stringify(incPlanner));
  }

  function onDelete(id) {
    const updateAfterDelete = planner.filter((ele) => {
      return ele.id != id;
    });
    setPlanner(updateAfterDelete);
    localStorage.setItem("ABC", JSON.stringify(updateAfterDelete));
  }
  function hideDialog(){
    setDialog(false);
  }
  return (
    <>
      <main className="main">
        <dialog open={appearDialog} onClick={hideDialog}> <GiSurprisedSkull style={{color: 'white', fontSize: '22px'}}/>Add Something Please!!!</dialog>
        <h1>Education Planner</h1>
        <UInput getDataFromUser={getDataFromUser} addItem={addItem} />
        <div className="card-container">
          {planner != null
            ? planner.map((ele, index) => (
                <Card
                  key={ele.id}
                  {...ele}
                  onDecrease={() => onDecrease(index)}
                  onIncrease={() => onIncrease(index)}
                  onDelete={() => onDelete(ele.id)}
                />
              ))
            : setPlanner([])}
        </div>

        
      </main>
    </>
  );
}