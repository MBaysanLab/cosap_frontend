import React from "react";
import Depth from "../../Components/Graph/Depth";
import HalfCircleSlider from "../../Components/Graph/HalfCircleSlider";
import Speedometer from "../../Components/Graph/Speedometer";
import TextBoxForGraph from "./TextBoxForGraph";

function OverViewTable({
  variantDetail
}) {


if (Object.keys(variantDetail).length === 0) {

return (
  "To see the details of the variant, click on the relevant variant."
  )
}
else{

  var depthMin = variantDetail.overview.depthMin;
  var depthMax = variantDetail.overview.depthMax;
  var depthValue = variantDetail.overview.depthValue;
  var runPercent = variantDetail.overview.runPercent;
  var transcriptText = variantDetail.overview.transcriptText;
  var cDNAText = variantDetail.overview.cDNAText;
  var accountPercent = variantDetail.overview.accountPercent;
  var varFraction = variantDetail.overview.varFraction;
  var sequenceFirstText = variantDetail.overview.sequenceFirstText;
  var sequenceSecondText = variantDetail.overview.sequenceSecondText;
  var refAltFirstText = variantDetail.overview.refAltFirstText;
  var refAltSecondText = variantDetail.overview.refAltSecondText;
  var aminoacidFirstText = variantDetail.overview.aminoacidFirstText;
  var aminoacidSecondText = variantDetail.overview.aminoacidSecondText;
  var communityPercent = variantDetail.overview.communityPercent;
  var proteinText = variantDetail.overview.proteinText;


  return (
    <table>
      <tbody>
        <tr>
          <th rowSpan="3">
            <Depth min={depthMin} max={depthMax} value={depthValue} />
          </th>
          <th rowSpan="2">
            <Speedometer title={"RUN"} percent={runPercent} size={125} />
          </th>
          <th rowSpan="6">unknown</th>
          <th>
            <TextBoxForGraph
              isArrowed={false}
              firstText={transcriptText}
              title="transcript"
            />
          </th>
          <th>Exon rank</th>
          <th>CDNs rank</th>
        </tr>
        <tr>
          <td>
            <TextBoxForGraph isArrowed={false} firstText={cDNAText} title="cDNA" />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th rowSpan="2">
            <Speedometer title={"ACCOUNT"} percent={accountPercent} size={125} />
          </th>
          <td>
            <TextBoxForGraph
              isArrowed={true}
              firstText={refAltFirstText}
              secondText={refAltSecondText}
              title="ref/alt"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th rowSpan="3">
            <HalfCircleSlider percentage={varFraction} title={"var FRACTION"} />
          </th>
          <td>
            <TextBoxForGraph
              isArrowed={true}
              firstText={sequenceFirstText}
              secondText={sequenceSecondText}
              title="sequence"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th rowSpan="2">
            <Speedometer title={"COMMUNITY"} percent={communityPercent} size={125} />
          </th>{" "}
          <td>
            <TextBoxForGraph
              isArrowed={true}
              firstText={aminoacidFirstText}
              secondText={aminoacidSecondText}
              title="aminoacid"
            />
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <TextBoxForGraph
              isArrowed={false}
              firstText={proteinText}
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
}

export default OverViewTable;
