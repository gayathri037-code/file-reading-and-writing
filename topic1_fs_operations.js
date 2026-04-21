// ============================================================
//   MINI PROJECT - TOPIC 1
//   File Read and Write Operations using the fs Module (Node.js)
// ============================================================

const fs = require('fs');
const path = require('path');

// ──────────────────────────────────────────────
// 1. WRITE A FILE (Synchronous)
// ──────────────────────────────────────────────
const filePath = path.join(__dirname, 'students.txt');

const content = `Name: Alice, Age: 20, Grade: A
Name: Bob, Age: 22, Grade: B
Name: Charlie, Age: 21, Grade: A+
Name: Diana, Age: 23, Grade: B+
`;

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ [1] File written successfully (Sync): students.txt');


// ──────────────────────────────────────────────
// 2. READ A FILE (Synchronous)
// ──────────────────────────────────────────────
const readData = fs.readFileSync(filePath, 'utf8');
console.log('\n✅ [2] File read successfully (Sync):');
console.log('─'.repeat(40));
console.log(readData);


// ──────────────────────────────────────────────
// 3. APPEND TO A FILE (Synchronous)
// ──────────────────────────────────────────────
const newEntry = 'Name: Eve, Age: 20, Grade: A\n';
fs.appendFileSync(filePath, newEntry, 'utf8');
console.log('✅ [3] Data appended to file (Sync).');


// ──────────────────────────────────────────────
// 4. WRITE A FILE (Asynchronous with Callback)
// ──────────────────────────────────────────────
const asyncFilePath = path.join(__dirname, 'marks.txt');
const marksData = `Subject: Math, Marks: 95
Subject: Science, Marks: 88
Subject: English, Marks: 76
`;

fs.writeFile(asyncFilePath, marksData, 'utf8', (err) => {
  if (err) {
    console.error('❌ Error writing file (Async):', err.message);
    return;
  }
  console.log('\n✅ [4] File written successfully (Async): marks.txt');

  // ──────────────────────────────────────────────
  // 5. READ A FILE (Asynchronous with Callback)
  // ──────────────────────────────────────────────
  fs.readFile(asyncFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ Error reading file (Async):', err.message);
      return;
    }
    console.log('\n✅ [5] File read successfully (Async):');
    console.log('─'.repeat(40));
    console.log(data);

    // ──────────────────────────────────────────────
    // 6. CHECK IF FILE EXISTS & GET FILE STATS
    // ──────────────────────────────────────────────
    fs.stat(asyncFilePath, (err, stats) => {
      if (err) {
        console.error('❌ Error getting file stats:', err.message);
        return;
      }
      console.log('✅ [6] File Stats:');
      console.log('─'.repeat(40));
      console.log(`   File Name : marks.txt`);
      console.log(`   Size      : ${stats.size} bytes`);
      console.log(`   Created   : ${stats.birthtime.toLocaleString()}`);
      console.log(`   Modified  : ${stats.mtime.toLocaleString()}`);
      console.log(`   Is File   : ${stats.isFile()}`);
      console.log(`   Is Dir    : ${stats.isDirectory()}`);
    });
  });
});


// ──────────────────────────────────────────────
// 7. RENAME A FILE
// ──────────────────────────────────────────────
const renamedPath = path.join(__dirname, 'students_backup.txt');
setTimeout(() => {
  // Small delay to ensure write completes before rename
  if (fs.existsSync(filePath)) {
    fs.rename(filePath, renamedPath, (err) => {
      if (err) {
        console.error('❌ Error renaming file:', err.message);
        return;
      }
      console.log('\n✅ [7] File renamed: students.txt → students_backup.txt');

      // ──────────────────────────────────────────────
      // 8. DELETE A FILE
      // ──────────────────────────────────────────────
      fs.unlink(renamedPath, (err) => {
        if (err) {
          console.error('❌ Error deleting file:', err.message);
          return;
        }
        console.log('✅ [8] File deleted: students_backup.txt');
      });
    });
  }
}, 500);


// ──────────────────────────────────────────────
// 9. CREATE A DIRECTORY
// ──────────────────────────────────────────────
const dirPath = path.join(__dirname, 'project_data');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log('\n✅ [9] Directory created: project_data/');
} else {
  console.log('\n✅ [9] Directory already exists: project_data/');
}


// ──────────────────────────────────────────────
// 10. WRITE JSON DATA TO A FILE
// ──────────────────────────────────────────────
const jsonFilePath = path.join(__dirname, 'project_data', 'students.json');
const studentsJSON = [
  { id: 1, name: 'Alice', age: 20, grade: 'A' },
  { id: 2, name: 'Bob', age: 22, grade: 'B' },
  { id: 3, name: 'Charlie', age: 21, grade: 'A+' },
  { id: 4, name: 'Diana', age: 23, grade: 'B+' },
  { id: 5, name: 'Eve', age: 20, grade: 'A' },
];

fs.writeFileSync(jsonFilePath, JSON.stringify(studentsJSON, null, 2), 'utf8');
console.log('✅ [10] JSON file written: project_data/students.json');


// ──────────────────────────────────────────────
// 11. READ & PARSE JSON FILE
// ──────────────────────────────────────────────
const rawJSON = fs.readFileSync(jsonFilePath, 'utf8');
const parsedStudents = JSON.parse(rawJSON);
console.log('\n✅ [11] JSON file read & parsed:');
console.log('─'.repeat(40));
parsedStudents.forEach(s => {
  console.log(`   ID: ${s.id} | Name: ${s.name} | Age: ${s.age} | Grade: ${s.grade}`);
});


// ──────────────────────────────────────────────
// 12. READ DIRECTORY CONTENTS
// ──────────────────────────────────────────────
const dirContents = fs.readdirSync(__dirname);
console.log('\n✅ [12] Files in current directory:');
console.log('─'.repeat(40));
dirContents.forEach(file => console.log('   📄', file));

console.log('\n🎉 All fs operations completed successfully!\n');
