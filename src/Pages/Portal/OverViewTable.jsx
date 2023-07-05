import React from "react";
import Depth from "../../Components/Graph/Depth";
import HalfCircleSlider from "../../Components/Graph/HalfCircleSlider";
import Speedometer from "../../Components/Graph/Speedometer";
import TextBoxForGraph from "./TextBoxForGraph";



function OverViewTable() {
  return (
    <table>
      <tbody>
        <tr>
          <th rowSpan="3">
            <Depth min={50} max={200} value={85} />
          </th>
          <th rowSpan="2">
            <Speedometer title={"RUN"} percent={100} size={125} />
          </th>
          <th rowSpan="6">unknown</th>
          <th>
            <TextBoxForGraph
              isArrowed={false}
              firstText="NM_0000222.2"
              title="transcript"
            />
          </th>
          <th>Exon rank</th>
          <th>CDNs rank</th>
        </tr>
        <tr>
          <td>
            <TextBoxForGraph isArrowed={false} firstText="c.129" title="cDNA" />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th rowSpan="2">
            <Speedometer title={"ACCOUNT"} percent={100} size={125} />
          </th>
          <td>
            <TextBoxForGraph
              isArrowed={true}
              firstText="ACTGT"
              secondText="T"
              title="ref/alt"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th rowSpan="3">
            <HalfCircleSlider percentage={75} title={"var FRACTION"} />
          </th>
          <td>
            <TextBoxForGraph
              isArrowed={true}
              firstText="ACTGT"
              secondText="T"
              title="sequence"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th rowSpan="2">
            <Speedometer title={"COMMINTY"} percent={100} size={125} />
          </th>{" "}
          <td>
            <TextBoxForGraph
              isArrowed={true}
              firstText="ACTGT"
              secondText="T"
              title="aminoacid"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <TextBoxForGraph />
            <TextBoxForGraph
              isArrowed={false}
              firstText="protein1"
              title="protein"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export default OverViewTable;
