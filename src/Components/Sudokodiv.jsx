import { Button, TextareaAutosize, TextField } from "@material-ui/core";
import { SendIcon } from "@material-ui/icons";
import React from "react";
import styles from "./Sudokodiv.module.css";
const Sudokoarr = [
  [0, 5, 0, 0, 1, 0, 0, 4, 0],
  [1, 0, 7, 0, 0, 0, 6, 0, 2],
  [0, 0, 0, 9, 0, 5, 0, 0, 0],
  [2, 0, 8, 0, 3, 0, 5, 0, 1],
  [0, 4, 0, 0, 7, 0, 0, 2, 0],
  [9, 0, 1, 0, 8, 0, 4, 0, 6],
  [0, 0, 0, 4, 0, 1, 0, 0, 0],
  [3, 0, 4, 0, 0, 0, 7, 0, 9],
  [0, 2, 0, 0, 6, 0, 0, 1, 0]
];
export const Sudokodiv = () => {
  const [sudokoarr, setsudokoarr] = React.useState(Sudokoarr);
  const [dummyarr, setdummyarr] = React.useState(sudokoarr);
  const FilterSudoko = (Data) => {
    let str = "";
    for (let m = 0; m < Data.length; m++) {
      for (let j = 0; j < Data[m].length; j++) {
        str += Data[m][j] + " ";
      }
    }
    return str.trim();
  };
  const [inputarr, setinputarr] = React.useState(FilterSudoko(Sudokoarr));
  const handletextarea = (e) => {
    const { value } = e.target;
    setinputarr(value);
  };
  const handlesubmit = () => {
    let str = inputarr.split("");
    let arr = [];
    for (let j = 0; j < str.length; j++) {
      if (
        str[j] === "1" ||
        str[j] === "2" ||
        str[j] === "3" ||
        str[j] === "4" ||
        str[j] === "5" ||
        str[j] === "6" ||
        str[j] === "7" ||
        str[j] === "8" ||
        str[j] === "9" ||
        str[j] === "0"
      ) {
        arr.push(Number(str[j]));
      }
    }
    if (arr.length !== 81) {
      return alert("Please Input Proper Sudoko");
    }
    let mainarr = [[], [], [], [], [], [], [], [], []];
    for (let m = 0; m <= 8; m++) {
      mainarr[0].push(arr[m]);
    }
    for (let m = 9; m <= 17; m++) {
      mainarr[1].push(arr[m]);
    }
    for (let m = 18; m <= 26; m++) {
      mainarr[2].push(arr[m]);
    }
    for (let m = 27; m <= 35; m++) {
      mainarr[3].push(arr[m]);
    }
    for (let m = 36; m <= 44; m++) {
      mainarr[4].push(arr[m]);
    }
    for (let m = 45; m <= 53; m++) {
      mainarr[5].push(arr[m]);
    }
    for (let m = 54; m <= 62; m++) {
      mainarr[6].push(arr[m]);
    }
    for (let m = 63; m <= 71; m++) {
      mainarr[7].push(arr[m]);
    }
    for (let m = 72; m <= 80; m++) {
      mainarr[8].push(arr[m]);
    }
    let dum = [];
    SudokoCheck(mainarr, 0, 0, dum);
    if (dum.length === 0) {
      return alert("Please Provide Right Sudoko to Solve");
    }
    setdummyarr(mainarr);
    setsudokoarr(mainarr);
    setinputarr(FilterSudoko(mainarr));
  };
  const Sudokosolve = (arr, i, j) => {
    Mainfunction(arr, i, j);
  };
  const SudokoCheck = (arr, i, j, check) => {
    if (j > 8 || i > 8) {
      if (i === 8 && j > 8) {
        check.push(true);
        return;
      }
      i++;
      j = 0;
    }
    if (arr[i][j] !== 0) {
      SudokoCheck(arr, i, j + 1, check);
    } else if (arr[i][j] === 0) {
      for (let m = 1; m <= 9; m++) {
        if (Allaspects(arr, i, j, m)) {
          let newarr = arr.map((el) => {
            return [...el];
          });
          newarr[i][j] = m;
          SudokoCheck(newarr, i, j + 1, check);
        }
      }
    }
  };
  const Mainfunction = (arr, i, j) => {
    if (j > 8 || i > 8) {
      if (i === 8 && j > 8) {
        setinputarr(FilterSudoko(arr));
        setsudokoarr(arr);
        return;
      }
      i++;
      j = 0;
    }
    if (arr[i][j] !== 0) {
      Mainfunction(arr, i, j + 1);
    } else if (arr[i][j] === 0) {
      for (let m = 1; m <= 9; m++) {
        if (Allaspects(arr, i, j, m)) {
          let newarr = arr.map((el) => {
            return [...el];
          });
          newarr[i][j] = m;
          setsudokoarr(newarr);
          setTimeout(() => {
            Mainfunction(newarr, i, j + 1);
          });
        }
      }
    }
  };
  const Allaspects = (arr, i, j, ans) => {
    if (
      Verticalchecking(arr, i, ans) &&
      HorizontalChecking(arr, j, ans) &&
      TilesCheck(arr, i, j, ans)
    ) {
      return true;
    }

    return false;
  };
  const Verticalchecking = (arr, i, ans) => {
    if (arr[i].includes(ans)) {
      return false;
    }
    return true;
  };
  const HorizontalChecking = (arr, k, ans) => {
    for (let j = 0; j < 9; j++) {
      if (arr[j][k] === ans) {
        return false;
      }
    }
    return true;
  };
  const TilesCheck = (arr, i, j, ans) => {
    let a = Math.floor(i / 3) * 3;
    let b = Math.floor(j / 3) * 3;

    for (let m = 0; m < 3; m++) {
      for (let w = 0; w < 3; w++) {
        if (arr[m + a][b + w] === ans) {
          return false;
        }
      }
    }

    return true;
  };
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "4vw",
          margin: "2%",
          fontStyle: "italic"
        }}
      >
        Sudoko Solver
      </h1>
      <div className={styles.MainDataDiv}>
        <div className={styles.SudokoDataDiv}>
          <div className={styles.Sudoko}>
            <div className={styles.FirstSudokoDiv}>
              <div className={styles.SecondSudokoDiv}>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[0][0] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[0][0] !== 0 ? sudokoarr[0][0] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[0][1] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[0][1] !== 0 ? sudokoarr[0][1] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[0][2] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[0][2] !== 0 ? sudokoarr[0][2] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[1][0] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[1][0] !== 0 ? sudokoarr[1][0] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[1][1] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[1][1] !== 0 ? sudokoarr[1][1] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[1][2] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[1][2] !== 0 ? sudokoarr[1][2] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[2][0] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[2][0] !== 0 ? sudokoarr[2][0] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[2][1] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[2][1] !== 0 ? sudokoarr[2][1] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[2][2] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[2][2] !== 0 ? sudokoarr[2][2] : ""}
                  </div>
                </div>
              </div>
              <div className={styles.SecondSudokoDiv}>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[0][3] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[0][3] !== 0 ? sudokoarr[0][3] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[0][4] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[0][4] !== 0 ? sudokoarr[0][4] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[0][5] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[0][5] !== 0 ? sudokoarr[0][5] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[1][3] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[1][3] !== 0 ? sudokoarr[1][3] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[1][4] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[1][4] !== 0 ? sudokoarr[1][4] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[1][5] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[1][5] !== 0 ? sudokoarr[1][5] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[2][3] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[2][3] !== 0 ? sudokoarr[2][3] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[2][4] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[2][4] !== 0 ? sudokoarr[2][4] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[2][5] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[2][5] !== 0 ? sudokoarr[2][5] : ""}
                  </div>
                </div>
              </div>
              <div className={styles.SecondSudokoDiv}>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[0][6] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[0][6] !== 0 ? sudokoarr[0][6] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[0][7] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[0][7] !== 0 ? sudokoarr[0][7] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[0][8] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[0][8] !== 0 ? sudokoarr[0][8] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[1][6] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[1][6] !== 0 ? sudokoarr[1][6] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[1][7] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[1][7] !== 0 ? sudokoarr[1][7] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[1][8] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[1][8] !== 0 ? sudokoarr[1][8] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[2][6] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[2][6] !== 0 ? sudokoarr[2][6] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[2][7] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[2][7] !== 0 ? sudokoarr[2][7] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[2][8] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[2][8] !== 0 ? sudokoarr[2][8] : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.FirstSudokoDiv}>
              <div className={styles.SecondSudokoDiv}>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[3][0] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[3][0] !== 0 ? sudokoarr[3][0] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[3][1] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[3][1] !== 0 ? sudokoarr[3][1] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[3][2] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[3][2] !== 0 ? sudokoarr[3][2] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[4][0] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[4][0] !== 0 ? sudokoarr[4][0] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[4][1] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[4][1] !== 0 ? sudokoarr[4][1] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[4][2] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[4][2] !== 0 ? sudokoarr[4][2] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[5][0] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[5][0] !== 0 ? sudokoarr[5][0] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[5][1] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[5][1] !== 0 ? sudokoarr[5][1] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[5][2] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[5][2] !== 0 ? sudokoarr[5][2] : ""}
                  </div>
                </div>
              </div>
              <div className={styles.SecondSudokoDiv}>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[3][3] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[3][3] !== 0 ? sudokoarr[3][3] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[3][4] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[3][4] !== 0 ? sudokoarr[3][4] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[3][5] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[3][5] !== 0 ? sudokoarr[3][5] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[4][3] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[4][3] !== 0 ? sudokoarr[4][3] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[4][4] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[4][4] !== 0 ? sudokoarr[4][4] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[4][5] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[4][5] !== 0 ? sudokoarr[4][5] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[5][3] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[5][3] !== 0 ? sudokoarr[5][3] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[5][4] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[5][4] !== 0 ? sudokoarr[5][4] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[5][5] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[5][5] !== 0 ? sudokoarr[5][5] : ""}
                  </div>
                </div>
              </div>
              <div className={styles.SecondSudokoDiv}>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[3][6] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[3][6] !== 0 ? sudokoarr[3][6] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[3][7] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[3][7] !== 0 ? sudokoarr[3][7] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[3][8] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[3][8] !== 0 ? sudokoarr[3][8] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[4][6] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[4][6] !== 0 ? sudokoarr[4][6] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[4][7] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[4][7] !== 0 ? sudokoarr[4][7] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[4][8] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[4][8] !== 0 ? sudokoarr[4][8] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[5][6] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[5][6] !== 0 ? sudokoarr[5][6] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[5][7] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[5][7] !== 0 ? sudokoarr[5][7] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[5][8] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[5][8] !== 0 ? sudokoarr[5][8] : ""}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.FirstSudokoDiv}>
              <div className={styles.SecondSudokoDiv}>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[6][0] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[6][0] !== 0 ? sudokoarr[6][0] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[6][1] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[6][1] !== 0 ? sudokoarr[6][1] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[6][2] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[6][2] !== 0 ? sudokoarr[6][2] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[7][0] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[7][0] !== 0 ? sudokoarr[7][0] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[7][1] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[7][1] !== 0 ? sudokoarr[7][1] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[7][2] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[7][2] !== 0 ? sudokoarr[7][2] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[8][0] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[8][0] !== 0 ? sudokoarr[8][0] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[8][1] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[8][1] !== 0 ? sudokoarr[8][1] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[8][2] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[8][2] !== 0 ? sudokoarr[8][2] : ""}
                  </div>
                </div>
              </div>
              <div className={styles.SecondSudokoDiv}>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[6][3] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[6][3] !== 0 ? sudokoarr[6][3] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[6][4] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[6][4] !== 0 ? sudokoarr[6][4] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[6][5] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[6][5] !== 0 ? sudokoarr[6][5] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[7][3] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[7][3] !== 0 ? sudokoarr[7][3] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[7][4] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[7][4] !== 0 ? sudokoarr[7][4] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[7][5] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[7][5] !== 0 ? sudokoarr[7][5] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[8][3] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[8][3] !== 0 ? sudokoarr[8][3] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[8][4] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[8][4] !== 0 ? sudokoarr[8][4] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[8][5] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[8][5] !== 0 ? sudokoarr[8][5] : ""}
                  </div>
                </div>
              </div>
              <div className={styles.SecondSudokoDiv}>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[6][6] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[6][6] !== 0 ? sudokoarr[6][6] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[6][7] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[6][7] !== 0 ? sudokoarr[6][7] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[6][8] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[6][8] !== 0 ? sudokoarr[6][8] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[7][6] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[7][6] !== 0 ? sudokoarr[7][6] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[7][7] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[7][7] !== 0 ? sudokoarr[7][7] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[7][8] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[7][8] !== 0 ? sudokoarr[7][8] : ""}
                  </div>
                </div>
                <div className={styles.ThirdSudokoDiv}>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[8][6] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[8][6] !== 0 ? sudokoarr[8][6] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[8][7] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[8][7] !== 0 ? sudokoarr[8][7] : ""}
                  </div>
                  <div
                    className={styles.FourthSudokoDiv}
                    style={{
                      color: dummyarr[8][8] === 0 ? "#348de7" : "black"
                    }}
                  >
                    {sudokoarr[8][8] !== 0 ? sudokoarr[8][8] : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.InputDataDiv}>
          <div className={styles.TakeInputDiv}>
            <div>
              <h3 style={{ textAlign: "left", margin: "0px" }}>
                Input Problem:
              </h3>
            </div>
            <div>
              <TextareaAutosize
                rowsMax={9}
                cols={17}
                style={{
                  padding: "30px",
                  fontSize: "1.5vw",
                  fontWeight: "bold",
                  color: "darkcyan",
                  border: "3px solid lightblue"
                }}
                value={inputarr}
                onChange={handletextarea}
              />
            </div>
          </div>
          <div className={styles.ButtonDiv}>
            <Button
              style={{ marginTop: "5px", marginLeft: "7%" }}
              color="primary"
              variant="contained"
              onClick={() => handlesubmit()}
            >
              Submit
            </Button>
            <Button
              style={{ marginLeft: "3%", marginTop: "5px" }}
              color="primary"
              variant="contained"
              onClick={() => Sudokosolve(sudokoarr, 0, 0)}
            >
              Solve
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
