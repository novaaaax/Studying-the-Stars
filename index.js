const brain = require('brain.js');
const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();

//creating mysql connection to save data
// still have to make connection
const PORT = process.env.PORT || 8080;
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
connection.connect(function (err) {
    if (err) {
        console.log(`error connection: ${err.stack}`);
        return;
    }
    console.log(`connected as id: ${connection.threadId}`);

    startPrompt();
})

const rgbNetwork = new brain.NeuralNetwork();
const bvNetwork = new brain.NeuralNetwork();

// rgb color
// network.train([
//     { input: [157, 180, 255], output: [0, 0, 0, 0, 0, 0, 1] }, // O
//     { input: [], output: [0, 0, 0, 0, 0, 0, 1] },
//     { input: [162, 185, 255], output: [0, 0, 0, 0, 0, 1, 0] }, // B
//     { input: [167, 188, 255], output: [0, 0, 0, 0, 0, 1, 0] },
//     { input: [170, 191, 255], output: [0, 0, 0, 0, 0, 1, 0] },
//     { input: [175, 195, 255], output: [0, 0, 0, 0, 0, 1, 0] },
//     { input: [186, 204, 255], output: [0, 0, 0, 0, 1, 0, 0] }, // A
//     { input: [192, 209, 255], output: [0, 0, 0, 0, 1, 0, 0] },
//     { input: [202, 216, 255], output: [0, 0, 0, 0, 1, 0, 0] },
//     { input: [228, 232, 255], output: [0, 0, 0, 1, 0, 0, 0] }, // F
//     { input: [237, 238, 255], output: [0, 0, 0, 1, 0, 0, 0] },
//     { input: [251, 248, 255], output: [0, 0, 0, 1, 0, 0, 0] },
//     { input: [255, 249, 249], output: [0, 0, 0, 1, 0, 0, 0] },
//     { input: [255, 245, 236], output: [0, 0, 1, 0, 0, 0, 0] }, // G
//     { input: [255, 244, 232], output: [0, 0, 1, 0, 0, 0, 0] },
//     { input: [255, 241, 223], output: [0, 0, 1, 0, 0, 0, 0] },
//     { input: [255, 235, 209], output: [0, 1, 0, 0, 0, 0, 0] }, // K
//     { input: [255, 215, 174], output: [0, 1, 0, 0, 0, 0, 0] },
//     { input: [255, 198, 144], output: [0, 1, 0, 0, 0, 0, 0] },
//     { input: [255, 190, 127], output: [1, 0, 0, 0, 0, 0, 0] }, // M
//     { input: [255, 187, 123], output: [1, 0, 0, 0, 0, 0, 0] },
//     { input: [255, 187, 123], output: [1, 0, 0, 0, 0, 0, 0] }
// ])

//bv index (color)
bvNetwork.train([
    { input: [0.03], output: [0, 0, 0, 0, 0, 0, 1] }, // type O 
    { input: [-0.2], output: [0, 0, 0, 0, 0, 0, 1] },
    { input: [0.19], output: [0, 0, 0, 0, 0, 0, 1] },
    { input: [-0.13], output: [0, 0, 0, 0, 0, 0, 1] }
])
// const output = network.run([-0.89])
// console.log(`Probability: ${output}`);

// var bvInputBtn = document.getElementById('bvInputBtn');
// bvInput.onsubmit = function () {
//     var bvInput = document.getElementById('bvInput');

// }

// var rgbInputBtn = document.getElementById('rgbInputBtn');
// rgbInput.onsubmit = function () {

// }
function startPrompt() {
    inquirer.prompt([
        {
            name: 'menuChoices',
            message: 'What would you like to do?',
            type: 'list',
            choices: [
                'Add star to database',
                'Determine star classification',
                'View database',
                'Exit'
            ]
        }
    ]).then(function (menuAnswers) {
        if (menuAnswers.menuChoices === 'Add star to database') {
            startDB();
        } else if (menuAnswers.menuChoices === 'Determine star classification') {
            startClass();
        } else if (menuAnswers.menuChoices === 'View database') {
            viewDatabase();
        } else {
            connection.end();
        }
    })
};

function startDB() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Please enter name:'
        },
        {
            name: 'date',
            type: 'input',
            message: 'Please enter date found:'
        },
        {
            name: 'time',
            type: 'input',
            message: 'Please enter time found:'
        },
        {
            name: 'coordinates',
            type: 'input',
            message: 'Please enter coordinates:'
        },
        {
            name: 'color',
            type: 'input',
            message: 'Please enter color (scale of your choice):'
        },
        {
            name: 'category',
            type: 'input',
            message: "Please enter type/classification:"
        }
    ]).then(function (starAnswers) {
        var star = starAnswers.title;
        var found = starAnswers.date;
        var found2 = starAnswers.time;
        var coord = starAnswers.coordinates;
        var shade = starAnswers.color;
        var classification = starAnswers.category;

        connection.query(`INSERT INTO star(name, date, time, coordinates, color, type) VALUES('${star}', '${found}', '${found2}', '${coord}', '${shade}', '${classification}')`,
            function (err, data) {
                if (err) {
                    throw err;
                }
                console.log(`${star} was added successfully!`);

                startPrompt();
            })
    })
}

function startClass() {
    inquirer.prompt([
        {
            name: 'twoScales',
            message: 'Will you use RGB or B-V Index?',
            type: 'list',
            choices: [
                'RGB',
                'B-V Index',
                'Main Menu'
            ]
        }
    ]).then(function (menu) {
        if (menu.twoScales === 'RGB') {
            startRGB();
        } else if (menu.twoScales === 'B-V Index') {
            startBV();
        } else {
            startPrompt();
        }
    })
}

function viewDatabase() {
    connection.query('SELECT * FROM star',
        function (err, rows) {
            if (err) {
                throw err;
            };
            rows.forEach(function (row) {
                console.table(`Name: ${row.name} Date Found: ${row.date} Time Found: ${row.time} Coordinates: ${row.coordinates} Color: ${row.color} Classification: ${row.type}`)
            });
            startPrompt();
        })
}

// function startRGB() {
//     inquirer.prompt([
//         {
//             name: 'RGB',
//             message: 'Input RGB:',
//             type: 'input'
//         }
//     ])
// }

// function startBV() {
//     inquirer.prompt([
//         {
//             name: 'bvIndex',
//             meassage: 'Input B-V Index',
//             type: 'input'
//         }
//     ]).then(function (userIndex) {
//         var userInput = userIndex.bvIndex;
//         const output = network.run([userInput])
//         console.log(`Probability: ${output}`);
//     })
// }