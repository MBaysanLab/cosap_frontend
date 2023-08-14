import React from "react";
import TagList from "../../Components/Graph/Tag";

function DetailsTable({ variantDetail: variant }) {
  if (Object.keys(variant).length === 0) {
    return "To see the details of the variant, click on the relevant variant.";
  } else {
    const aliasesTags = variant.details.aliasesTags;
    const variantTypesTags = variant.details.variantTypesTags;
    const hgvsTags = variant.details.hgvsTags;
    const maneTags = variant.details.maneTags;
    const geneTag = variant.details.geneTag;
    const alleleRegistryTag = variant.details.alleleRegistryTag;
    const clinTag = variant.details.clinTag;
    const openCRAVATTag = variant.details.openCRAVATTag;
    const transcriptTag = variant.details.transcriptTag;
    const refBuildValue = variant.details.refBuildValue;
    const ensemblyVersionValue = variant.details.enssemblyVersionValue;
    const chrValue = variant.details.chrValue;
    const startValue = variant.details.startValue;
    const stopValue = variant.details.stopValue;
    const refBasesValue = variant.details.refBasesValue;

    return (
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td colSpan="2" className="specialCell">
                Aliases
              </td>
              <td colSpan="4">
                <TagList tags={aliasesTags} />
              </td>
              <td className="specialCell">Gene</td>
              <td>
                <TagList tags={geneTag} />
              </td>
              <td className="specialCell">Allele Registry ID</td>
              <td>
                <TagList tags={alleleRegistryTag} />
              </td>
              <td colSpan="2"></td>
            </tr>
            <tr>
              <td className="specialCell" colSpan="2">
                Variant Types
              </td>
              <td colSpan="4">
                <TagList tags={variantTypesTags} />
              </td>
              <td className="specialCell">clin</td>
              <td>
                <TagList tags={clinTag} />
              </td>
              <td className="specialCell">OpenCRAVAT</td>
              <td>
                <TagList tags={openCRAVATTag} />
              </td>
            </tr>
            <tr>
              <td className="specialCell" colSpan="2">
                HGVS
              </td>
              <td colSpan="4">
                <TagList tags={hgvsTags} />
              </td>
              <td colSpan="5"></td>
            </tr>
            <tr>
              <td className="specialCell" colSpan="2">
                MANE
              </td>
              <td colSpan="4">
                <TagList tags={maneTags} />
              </td>
              <td colSpan="5"></td>
            </tr>
            <tr>
              <td className="detailTableHeader" colSpan="7">
                Representative Variant Coordinates
              </td>
              <td colSpan="5"></td>
            </tr>
            <tr>
              <td className="specialCell" colSpan="2">
                Ref. Build
              </td>
              <td colSpan="2">{refBuildValue}</td>
              <td className="specialCell" colSpan="2">
                Ensembly Version
              </td>
              <td colSpan="2">{ensemblyVersionValue}</td>
              <td colSpan="5"></td>
            </tr>
            <tr>
              <td className="detailTableHeader" colSpan="7">
                Coordinates
              </td>
              <td colSpan="5"></td>
            </tr>
            <tr>
              <td className="specialCell">Chr.</td>
              <td>{chrValue}</td>
              <td className="specialCell">Start</td>
              <td>{startValue}</td>
              <td className="specialCell">Stop</td>
              <td>{stopValue}</td>
              <td className="specialCell">Ref. Bases</td>
              <td>{refBasesValue}</td>
              <td colSpan="5"></td>
            </tr>
            <tr>
              <td className="specialCell" colSpan="2">
                Var. Bases
              </td>
              <td colSpan="2">A</td>
              <td className="specialCell" colSpan="2">
                Transcript
              </td>
              <td colSpan="2">
                <TagList tags={transcriptTag} />
              </td>
              <td colSpan="5"></td>
            </tr>
            <tr>
              <td colSpan="13"></td>
            </tr>
            <tr>
              <td colSpan="13"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DetailsTable;
