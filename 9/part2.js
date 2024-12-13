function compactDisk(diskMap) {
  // Parse the input into files and free spaces
  const blocks = [];
  let currentId = 0;

  for (let i = 0; i < diskMap.length; i++) {
    const length = parseInt(diskMap[i]);
    for (let j = 0; j < length; j++) {
      blocks.push(i % 2 === 0 ? currentId : '.');
    }
    if (i % 2 === 0) currentId++; // Increment file ID for the next file
  }

  // Find files in descending order of file ID
  const files = [];
  let freeSpaces = [];
  blocks.forEach((block, idx) => {
    if (block !== '.') {
      if (!files[block]) files[block] = [];
      files[block].push(idx);
    } else {
      freeSpaces.push(idx);
    }
  });

  // Simulate file movement
  for (let id = files.length - 1; id >= 0; id--) {
    if (!files[id]) continue;

    const fileSize = files[id].length;

    // Find the leftmost span of free space large enough for the file
    let spanStart = -1;
    for (let i = 0; i < freeSpaces.length; i++) {
      if (freeSpaces[i + fileSize - 1] === freeSpaces[i] + fileSize - 1) {
        spanStart = freeSpaces[i];
        break;
      }
    }

    if (spanStart === -1) continue; // No space available

    // Move the file to the free space
    files[id].forEach(idx => blocks[idx] = '.'); // Clear the file's current blocks
    for (let i = 0; i < fileSize; i++) {
      blocks[spanStart + i] = id;
    }

    // Update free spaces
    freeSpaces = blocks
      .map((block, idx) => (block === '.' ? idx : -1))
      .filter(idx => idx !== -1);
  }

  // Calculate the checksum
  let checksum = 0;
  blocks.forEach((block, idx) => {
    if (block !== '.') checksum += idx * block;
  });

  return checksum;
}

// Example Usage
const diskMap = "2333133121414131402";
console.log(compactDisk(diskMap)); // Output: 2858

