import React from "react";
import TagList from "../../Components/Graph/Tag";

function DetailsTable() {
  return (
    <div className="table-container">
      <table>
        <tbody>
          <tr>
            <td colSpan="2" className="specialCell">
              Aliases
            </td>
            <td colSpan="4">
              <TagList tags={['Allies1', 'Allies2', 'Allies3', 'Allies4', 'Allies5']} />
            </td>
            <td className="specialCell">gene</td>
            <td>1</td>
            <td className="specialCell">allel</td>
            <td>2</td>
            <td colSpan="2"></td>
          </tr>
          <tr>
            <td className="specialCell" colSpan="2">Variant Types</td>
            <td colSpan="4">x1</td>
            <td className="specialCell">clin</td>
            <td>x2</td>
            <td className="specialCell">open</td>
            <td>x3</td>
          </tr>
          <tr>
            <td className="specialCell" colSpan="2">HGVS</td>
            <td colSpan="4">x4</td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <td className="specialCell" colSpan="2">MANE</td>
            <td colSpan="4">x5</td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <td colSpan="7">Representative</td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <td className="specialCell" colSpan="2">ref</td>
            <td colSpan="2">gr</td>
            <td className="specialCell" colSpan="2">ensembly</td>
            <td colSpan="2">75</td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <td colSpan="7">coordinates</td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <td className="specialCell">chr</td>
            <td>9</td>
            <td className="specialCell">start</td>
            <td>3</td>
            <td className="specialCell">stop</td>
            <td>3</td>
            <td className="specialCell">ref</td>
            <td>3</td>
            <td colSpan="5"></td>
          </tr>
          <tr>
            <td className="specialCell" colSpan="2">var</td>
            <td colSpan="2">a</td>
            <td className="specialCell" colSpan="2">trans</td>
            <td colSpan="2">ens123</td>
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

export default DetailsTable;
