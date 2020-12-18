// import React, { Component } from 'react'
//
// class Table extends Component {
//
//
//
//   render() {
//
//     const renderCircles = () => {
//       return (coords, index) => {
//         console.log("coords.....", coords);
//         console.log("index......",index);
//         const circleProps = {
//           r: yAx(coords.value),
//           cx: 0,
//           cy: 0,
//           opacity:1,
//           fill: "#6fa3ff",
//           className: 'scatter',
//           key: index,
//         };
//         var p1 = parseInt(coords.key.substring(0, 1)) - 1;
//         var p2 = parseInt(coords.key.substring(2, 3)) - 1;
//         var t = coords.key.substring(1, 2)
//         console.log("p1", p1);
//         //
//         // circleProps.cx = 1.5*props.padding + p2*(props.height-2*props.padding)/length + ((props.height-2*props.padding)/length)/2;
//         // circleProps.cy = 1.5*props.padding + p1*(props.height-2*props.padding)/length + ((props.height-2*props.padding)/length)/2;
//         // console.log("cx....", circleProps.cx);
//         // console.log("cx....", circleProps.cy);
//
//         return <circle {...circleProps}><title>{"N: " + coords.value}</title></circle>;
//       };
//     };
//
//     const names = ['James', 'Paul', 'John', 'George', 'Ringo'];
//     return(
//       <div>
//         <table class="beta">
//           <thead>
//           <tr >
//             <td></td>
//             {names.map(col =>(
//               <td key = {col}>{col}</td>
//             ))}
//           </tr>
//           </thead>
//           {names.map(row => (
//             <tr key={row}> {row}
//               {names.map(col =>(
//                 <td key = {col}>{renderCircles()}</td>
//               ))}
//             </tr>
//           ))}
//         </table>
//
//       </div>
//
//     )
//   }
//
// }
//
// export default Table