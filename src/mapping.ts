//@ts-ignore
import { BigInt, require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Block, Event } from "@hyperoracle/zkgraph-lib";

// //@ts-ignore
// import { ByteArray, Bytes, BigInt, require } from "@hyperoracle/zkgraph-lib";
// import { Event } from "@hyperoracle/zkgraph-lib";

// function emptyGameBoard(): i8[][] {
//   let emptyGameBoardRow: i8[] = [];
//   for (var i = 0; i < 34; i++) {
//     emptyGameBoardRow.push(0);
//   }
//   let emptyGameBoard: i8[][] = [];
//   for (var i = 0; i < 34; i++) {
//     emptyGameBoard.push(emptyGameBoardRow);
//   }
//   return emptyGameBoard;
// }

// function writeGameBoardFromRedAndBlueCoordinates(
//   red_x_coords: u8[],
//   red_y_coords: u8[],
//   blue_x_coords: u8[],
//   blue_y_coords: u8[]
// ) {
//   // TODO: Check that red_x_coords and red_y_coords are the same length
//   // (and same for blue)
//   let gameBoard: i8[][] = emptyGameBoard();
//   for (var i = 0; i < red_x_coords.length; i++) {
//     gameBoard[red_x_coords[i]][red_y_coords[i]] = 1;
//   }
//   for (var i = 0; i < blue_x_coords.length; i++) {
//     gameBoard[blue_x_coords[i]][blue_y_coords[i]] = -1;
//   }
// }

// function updateGameBoard(gameBoard: i8[][]): i8[][] {
//   let newGameBoard = emptyGameBoard();
//   for (var i = 0; i < 34; i++) {
//     // To make the math of updating the state easier, there is a wall of zeroes
//     // around the game board that never changes.
//     for (var j = 0; j < 34; j++) {
//       // If the cell currently under consideration is in the wall of zeroes, don't change it.
//       if (!(i == 0 || j == 0 || i == 33 || j == 33)) {
//         let signedNeighborhoodSum: i8 =
//           gameBoard[i - 1][j - 1] +
//           gameBoard[i - 1][j] +
//           gameBoard[i - 1][j + 1] +
//           gameBoard[i][j - 1] +
//           gameBoard[i][j + 1] +
//           gameBoard[i + 1][j - 1] +
//           gameBoard[i + 1][j + 1];
//         // It's an i8 but it's always positive.
//         let unsignedNeighborhoodSum: i8 = abs(signedNeighborhoodSum);
//         let isAlive: i8 = abs(gameBoard[i][j]);
//         // If the cell has 1 or fewer neighbors, or 4 or more neighbors, it dies.
//         if (unsignedNeighborhoodSum <= 1 || unsignedNeighborhoodSum >= 4) {
//           newGameBoard[i][j] = 0;
//         }
//         // If the cell has three neighbors, it takes the color of the majority
//         // around it, whether or not it is currently alive or dead.
//         else if (unsignedNeighborhoodSum == 3 && signedNeighborhoodSum > 0) {
//           newGameBoard[i][j] = 1;
//         } else if (unsignedNeighborhoodSum == 3 && signedNeighborhoodSum < 0) {
//           newGameBoard[i][j] = -1;
//         }
//         // If the cell is alive and has two red neighbors, it turns red.
//         else if (
//           unsignedNeighborhoodSum == 2 &&
//           isAlive == 1 &&
//           signedNeighborhoodSum == 2
//         ) {
//           newGameBoard[i][j] = 1;
//         }
//         // If the cell is alive and has two blue neighbors, it turns blue.
//         else if (
//           unsignedNeighborhoodSum == 2 &&
//           isAlive == 1 &&
//           signedNeighborhoodSum == -2
//         ) {
//           newGameBoard[i][j] = -1;
//         }
//         // If the cell is alive and has two neighbors, one red and one blue,
//         // it remains the same as it was in the last step.
//         else if (
//           unsignedNeighborhoodSum == 2 &&
//           isAlive &&
//           signedNeighborhoodSum == 0
//         ) {
//           newGameBoard[i][j] = gameBoard[i][j];
//         }
//         // The only remaining case is that the cell has two neighbors and
//         // it is dead, in which case it stays dead.
//         else {
//           newGameBoard[i][j] = 0;
//         }
//       }
//     }
//   }
//   return newGameBoard;
// }

// export function handleEvents(events: Event[]): Bytes {
//   // let state = new Bytes(0);
//   // if (events.length > 0) state = events[0].address;

//   // require(state.length === 20);
//   // return state;
//   let reserve0 = BigInt.fromBytesBigEndian(events[0].data.slice(0, 32));
//   let reserve1 = BigInt.fromBytesBigEndian(events[0].data.slice(32, 64));
//   let sum_hexstring = reserve0.plus(reserve1).toHexString();
//   let sum_bytes = Bytes.fromHexString(sum_hexstring);
//   return sum_bytes;
// }

let addr = Bytes.fromHexString("0xa60ecf32309539dd84f27a9563754dca818b815e");
let esig_sync = Bytes.fromHexString(
  "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
);

export function handleBlocks(blocks: Block[]): Bytes {
  // init output state
  // let state: Bytes;

  // #1 can access all (matched) events of the latest block
  let events: Event[] = blocks[0].events;

  // #2 also can access (matched) events of a given account address (should present in yaml first).
  // a subset of 'events'
  // let eventsByAcct: Event[] = blocks[0].account(addr).events;

  // #3 also can access (matched) events of a given account address & a given esig  (should present in yaml first).
  // a subset of 'eventsByAcct'
  // let eventsByAcctEsig: Event[] = blocks[0]
  //   .account(addr)
  //   .eventsByEsig(esig_sync);

  // require match event count > 0
  // require(eventsByAcctEsig.length > 0);

  // this 2 way to access event are equal effects, alway true when there's only 1 event matched in the block (e.g. block# 2279547 on sepolia).
  // require(events[0].data == eventsByAcct[0].data &&
  //   events[0].data == eventsByAcctEsig[0].data);

  // set state to the address of the 1st (matched) event, demo purpose only.
  // state = events[0].address;
  // return state;
  const red_x_offset = 160;
  const red_y_offset = 224;
  const blue_x_offset = 288;
  const blue_y_offset = 354;

  let num_red_cells = events[0].data.slice(159, 160)[0] as u8;
  let red_x_coords = events[0].data.slice(160, 160 + num_red_cells);
  let red_y_coords = events[0].data.slice(224, 224 + num_red_cells);

  let num_blue_cells = events[0].data.slice(287, 288)[0] as u8;
  let blue_x_coords = events[0].data.slice(160, 160 + num_blue_cells);
  let blue_y_coords = events[0].data.slice(224, 224 + num_blue_cells);
  // let number_1_x = events[0].data.slice(160, 161); // should be 01.
  // let number_1_y = events[0].data.slice(224, 225); // 224 - 160 = 64
  // let number_2_x = events[0].data.slice(161, 162);
  // let number_2_y = events[0].data.slice(225, 226);
  // let number_3_x = events[0].data.slice(162, 163);
  // let number_3_y = events[0].data.slice(226, 227);

  let blue_1_x = events[0].data.slice(288, 289); // 288-224 = 64
  let blue_1_y = events[0].data.slice(352, 353); // 352-288 = 64
  let blue_2_x = events[0].data.slice(289, 290);
  let blue_2_y = events[0].data.slice(353, 354);
  let blue_3_x = events[0].data.slice(290, 291);
  let blue_3_y = events[0].data.slice(354, 355);

  return blue_1_x;

  // let number_1_bytes = events[0].data.slice(0, 32);
  // let number_2_bytes = events[1].data.slice(32, 64);
  // let number_1_bigint = BigInt.fromBytes(number_1_bytes);
  // let number_2_bigint = BigInt.fromBytes(number_2_bytes);
  // let sum_bigint = number_1_bigint.plus(number_2_bigint);
  // let sum_bytes = Bytes.fromHexString(sum_bigint.toHexString());
  // return sum_bytes;
}
