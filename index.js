//
//	Spark the Electric Jester 3 Save Editor
//

const prompt = require('prompt-sync')();
const cliSelect = require('cli-select');	//CLI-Select is under MIT license
const editJsonFile = require("edit-json-file");



//Highest Combat Difficulty: 4
//Highest Platforming Difficulty: 2
const stages = 300
const powers = ["Speed Buff", "Explosion", "Speed Blast Boost",
				"Power Buff", "Teleport", "Scouter",
				"Blast Machine Gun", "Reaper"]


console.log("You can exit by writing 'exit' or clicking Esc.")

//Handle prompts and leave the option to 'exit'
function ask(question){
	let answer = prompt(question);
	if(answer == 'exit'){
		process.exit();
	}else{
		return answer;
	};
};

function exit(){
	prompt("Exiting program, press any key...")
};

//Loads the save file as JSON with edit-json-file
function loadSave(slot){
	slot = slot.replace( /^\D+/g, ''); //Filter letters and leave numbers, 10003683 on Stackoverflow
	file = editJsonFile('save'+slot+'.save',{
		autosave: true
	})
	return file;
};

//Creates an array with the specified boolean (or object) and length
function boolArr(length, bool){
	return new Array(length).fill(bool)
};

//Multiple attempts at loading the save in case of failure or user acting weird
try{
	var output = ask("Which save file to modify? (0, 1, 2, 3, 4)");
	file = loadSave(output)
}catch{
	console.log("Failed to load save file, choosing save0.save.")
	try{
		file = loadSave('0')
	}catch{
		console.log("Cannot load save0.save, make sure you're running the program in the same directory as the saves.")
		exit()
	}
}

//Earlier code, fs failed to update
//file.StageUnlocked = boolArr(file.StageUnlocked, true)

//Handle different IDs for choosing what to do
function handleChoice(file, id){
	switch (id){
		case 0:
			file.set("SlotInUse", true);
			break;
		case 1:
			file.set("GameComplete", true);
			break;
		case 2:
			let diffC = ask("Choose Combat Difficulty (0, 1, 2, 3, 4)")
			file.set("CombatDificulty", diffC);
			break;
		case 3:
			let diffP = ask("Choose Platforming Difficulty (0, 1, 2)")
			file.set("PlatformingDificulty", diffP);
			break;
		case 4:
			file.set("StageCompleted", boolArr(stages, true))
			break;
		case 5:
			file.set("StageUnlocked", boolArr(stages, true))
			break;
		case 6:
			file.set("SpeedGoldMedals", boolArr(stages, true))
			break;
		case 7:
			file.set("SpeedDiaMedals", boolArr(stages, true))
			break;
		case 8:
			file.set("ScoreGoldMedals", boolArr(stages, true))
			break;
		case 9:
			file.set("ScoreDiaMedals", boolArr(stages, true))
			break;
		case 10:
			file.set("CollectathonStagePoints", 999999999)
			break;
		case 11:
			for(let i = 0; i <= 9; i++){
				file.set("ExploreMedal"+i, boolArr(stages, true))};
			break;
		case 12:
			for(let powe = 0; powe < powers.length; powe++){
				process.stdout.write(powe+1 + " - "+powers[powe]+"\n")
			};
			file.set("DpadUP", ask("Choose power for Up: "))
			file.set("DpadDown", ask("Choose power for Down: "))
			file.set("DpadLeft", ask("Choose power for Left: "))
			file.set("DpadRight", ask("Choose power for Right: "))
			break;
		case 13:
			file.set("Move00_SpinCharge", true)
			file.set("Move00_SpinCharge_Enabled", true)
			file.set("Move01_DualAirKick", true)
			file.set("Move01_DualAirKick_Enabled", true)
			file.set("Move02_DualAirSlash", true)
			file.set("Move02_DualAirSlash_Enabled", true)
			file.set("Move03_ExtraFinisher", true)
			file.set("Move03_ExtraFinisher_Enabled", true)
			file.set("Move04_SkywardSlash", true)
			file.set("Move04_SkywardSlash_Enabled", true)
			file.set("Move05_DownSlashSpin", true)
			file.set("Move05_DownSlashSpin_Enabled", true)
			file.set("Move07_AbruptFinisher", true)
			file.set("Move07_AbruptFinisher_Enabled", true)
			file.set("Move08_DuplexSlash", true)
			file.set("Move08_DuplexSlash_Enabled", true)
			break;
		case 14:
			file.set("Special01_SpeedBuff", true)
			file.set("Special02_Explosion", true)
			file.set("Special03_SpeedBlastBoost", true)
			file.set("Special04_PowerBuff", true)
			file.set("Special05_Teleport", true)
			file.set("Special06_Scouter", true)
			file.set("Special07_BlastMachineGun", true)
			break;
		case 15:
			file.set("Power_Reaper", true)
			file.set("Power_Reaper_Unlocked", true)
			break;
		case 16:
			let bits = ask("Insert desired bits number: ")
			file.set("Bits", bits)
			break;
		case 17:
			file.set("ChargedBlast", true)
			file.set("RailBoost", true)
			file.set("RegenBreak", true)
			file.set("JesterSwipe", true)
			file.set("JesterSwipeEnabled", true)
			break;
		case 18:
			file.set("AllMovesReminder", true)
			file.set("WallWalk", true)
			file.set("Rail", true)
			file.set("FallDamage", true)
			file.set("ComboBar", true)
			file.set("CombatBasics", true)
			file.set("GameProgressInfo", true)
			file.set("SpecialMedals", true)
			file.set("Shop", true)
			file.set("CollectStage", true)
			file.set("RaidStage", true)
			file.set("EscapeStage", true)
			file.set("SuperMoves", true)
			file.set("JesterDashTut", true)
			break;
		case 19:
			for(let j=0; j <= 18; j++){
				handleChoice(file,j)
			};
	};
};


const edits = ["Toggle Slot in Use","Finish the Game",
	"Set Combat Difficulty","Set Platforming Difficulty",
	"Complete all Stages","Unlock all Stages",
	"Get all Speed Gold Medals","Get all Speed Diamond Medals",
	"Get all Score Gold Medals","Get all Score Diamond Medals",
	"Set Collectathon Stage Points to 999,999,999","Get all Exploration Medals", //Note that there are 10
	"Set Power in DPad","Unlock all Moves",
	"Unlock all Specials","Unlock the Reaper",
	"Set Bits Number","Unlock all Jester Powers",
	"Turn off Tutorials", "All of the Above!"]

//20 possible edits


//Keep asking the user to choose an edit
function mainLoop(){
	cliSelect({values:edits, selected:'   >',unselected:' '}, (response) => {
		console.log("Choice was:",response.value,"ID:", response.id)
		handleChoice(file, response.id)
		if(response.id != null){mainLoop()};
	})
}

mainLoop();